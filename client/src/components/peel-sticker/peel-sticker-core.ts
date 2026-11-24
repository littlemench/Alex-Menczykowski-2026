/**
 * peel-sticker-core.ts
 * Framework-agnostic WebGL renderer for a realistic "sticker peel" effect.
 *
 * The sticker is bent around a real cylinder (inverse-mapped per pixel in a
 * fragment shader). The lifted paper shows its light-grey underside, is lit
 * by a soft key light from the top left, and casts a ray-traced, soft-edged
 * shadow onto the page and onto the sticker beneath it.
 *
 * Usage (vanilla):
 *   const peel = createPeelSticker(containerEl, { src: '/sticker.png' });
 *   // later: peel.destroy();
 */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;    // printed artwork (premultiplied)
uniform sampler2D uFilm;   // die-cut film mask (alpha)
uniform vec2  uSize;       // image size (image px)
uniform float uPad;        // padding around the image (image px)
uniform vec2  uD;          // unit peel direction (image space, y down)
uniform float uL;          // curl line position along uD
uniform float uR;          // curl radius (image px)
uniform vec3  uLight;      // unit vector towards the key light
uniform vec3  uLs[8];      // jittered light directions (area light)
uniform vec3  uBack;       // underside colour of the printed areas
uniform float uPx;         // image px per device px
uniform float uShadow;     // shadow strength
uniform float uGloss;      // specular on the printed face
uniform float uFilmShadow; // how much light the clear film blocks (0..1)
const float PI = 3.14159265;

bool inside(vec2 uv){ return uv.x >= 0.0 && uv.y >= 0.0 && uv.x <= 1.0 && uv.y <= 1.0; }
vec4 ink(vec2 p){ vec2 uv = p / uSize; return inside(uv) ? texture2D(uTex, uv) : vec4(0.0); }
float film(vec2 p){ vec2 uv = p / uSize; return inside(uv) ? texture2D(uFilm, uv).a : 0.0; }
// how much light a single layer of sticker blocks at p
float opac(vec2 p){ return max(ink(p).a, film(p) * uFilmShadow); }
vec2 src(vec2 p, float x, float s){ return p + uD * (s - x); }
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// cut-edge band of the film around source point sp (0 inside/outside, 1 on the edge)
float cutEdge(vec2 sp){
  float e = 1.6 * uPx;
  float f = film(sp);
  float mn = min(min(film(sp + vec2(e, 0.0)), film(sp - vec2(e, 0.0))),
                 min(film(sp + vec2(0.0, e)), film(sp - vec2(0.0, e))));
  return clamp((f - mn) * 1.6, 0.0, 1.0);
}

float occlRay(vec2 q, vec3 Ld){
  float xq = dot(q, uD) - uL;
  float ld = dot(Ld.xy, uD);
  float occ = 0.0;
  float t = 2.0 * uR / Ld.z;
  float xh = xq + ld * t;
  if (xh < 0.0) occ = max(occ, opac(src(q + Ld.xy * t, xh, PI * uR - xh)));
  float A = ld * ld + Ld.z * Ld.z;
  float B = 2.0 * (xq * ld - uR * Ld.z);
  float C = xq * xq;
  float disc = B * B - 4.0 * A * C;
  if (disc > 0.0) {
    float sq = sqrt(disc);
    for (int k = 0; k < 2; k++) {
      float tt = (-B + (k == 0 ? -sq : sq)) / (2.0 * A);
      if (tt > 0.5) {
        float X = xq + ld * tt;
        float Z = Ld.z * tt;
        float th = atan(X, uR - Z);
        if (th < 0.0) th += 2.0 * PI;
        if (th <= PI) occ = max(occ, opac(src(q + Ld.xy * tt, X, uR * th)));
      }
    }
  }
  return occ;
}
float shadowAt(vec2 q){
  float s = 0.0;
  for (int i = 0; i < 8; i++) s += occlRay(q, uLs[i]);
  return s / 8.0;
}
float aoAt(vec2 q){
  float xq = dot(q, uD) - uL;
  float ao = 0.0;
  if (xq < 0.0) {
    ao = opac(src(q, xq, PI * uR - xq)) * 0.10;
    ao = max(ao, opac(q - uD * xq) * 0.30 * exp(xq / (0.55 * uR)));
  } else if (xq < uR) {
    float th1 = asin(clamp(xq / uR, 0.0, 1.0));
    ao = max(opac(src(q, xq, uR * th1)), opac(src(q, xq, uR * (PI - th1)))) * 0.30;
  }
  return ao;
}

float diffuse(vec3 n){ return 0.38 + 0.62 * max(dot(n, uLight), 0.0) / uLight.z; }
float spec(vec3 n, float pw){
  vec3 h = normalize(uLight + vec3(0.0, 0.0, 1.0));
  return max(pow(max(dot(n, h), 0.0), pw) - pow(h.z, pw), 0.0);
}
vec4 over(vec4 top, vec4 under){ return top + under * (1.0 - top.a); }

// a lifted piece of sticker seen from either face.
// backFace: we see the adhesive side. n: surface normal facing the viewer.
vec4 liftedLayer(vec2 sp, vec3 n, bool backFace, float occl){
  float F = film(sp);
  if (F <= 0.0) return vec4(0.0);
  vec4 I = ink(sp);
  float fres = pow(1.0 - clamp(n.z, 0.0, 1.0), 4.0);
  // clear film: barely there, glossier at grazing angles and along the roll
  float filmA = (0.05 + 0.55 * fres) * occl;
  vec4 col = vec4(vec3(1.0) * filmA, filmA) * F;
  col.rgb += vec3(1.0) * 0.55 * spec(n, 40.0) * F;
  col.a = clamp(col.a + 0.55 * spec(n, 40.0) * F, 0.0, 1.0);
  // printed area
  vec4 pc;
  if (backFace) {
    float lb = 0.30 + 0.70 * max(dot(n, uLight), 0.0) / uLight.z;
    float grain = (hash(floor(sp)) - 0.5) * 0.035;
    pc = vec4(uBack * (lb + grain) * occl + vec3(0.25) * spec(n, 22.0), 1.0) * I.a;
  } else {
    pc = vec4(I.rgb * diffuse(n) * occl + I.a * uGloss * spec(n, 60.0), I.a);
  }
  col = over(pc, col);
  // the cut edge of the vinyl catches the light
  float e = cutEdge(sp);
  float lit = 0.5 + 0.5 * max(dot(n, uLight), 0.0);
  col = over(vec4(vec3(lit) * 0.55 * e, 0.55 * e), col);
  return col;
}

void main(){
  vec2 full = uSize + 2.0 * uPad;
  vec2 p = vec2(-uPad + vUv.x * full.x, -uPad + (1.0 - vUv.y) * full.y);
  float x = dot(p, uD) - uL;

  // ---- ground: page + flat sticker ---------------------------------------
  float S = 0.0;
  if (uR > 0.5) S = clamp(0.7 * shadowAt(p) + aoAt(p), 0.0, 0.9);
  float shade = uShadow * S;

  // contact shadow from the film's thickness (offset away from the light)
  vec2 off = -uLight.xy / uLight.z * 1.2 * uPx;
  float eA = 0.0;
  for (int i = 0; i < 3; i++) {
    vec2 qq = p - off * (1.0 + float(i));
    if (dot(qq, uD) - uL < 0.0) eA += film(qq);
  }
  // only just outside the cut edge, never under the clear film itself
  eA *= 0.05 * (1.0 - film(p));

  vec4 col = vec4(0.0, 0.0, 0.0, clamp(shade + eA, 0.0, 1.0));

  if (x < 0.0) {
    float F = film(p);
    if (F > 0.0) {
      // clear film lying flat: faint sheen + lit / shaded cut edge
      vec2 lo = uLight.xy / uLight.z * 1.6 * uPx;
      float edgeLit  = clamp(F - film(p + lo), 0.0, 1.0);
      float edgeDark = clamp(F - film(p - lo), 0.0, 1.0);
      vec4 fc = vec4(vec3(1.0), 1.0) * 0.01 * F;
      float rim = cutEdge(p);
      fc = over(vec4(0.0, 0.0, 0.0, 0.07 * rim), fc);          // the cut line itself
      fc = over(vec4(vec3(1.0), 1.0) * 0.6 * edgeLit, fc);     // edge facing the light
      fc = over(vec4(0.0, 0.0, 0.0, 0.18 * edgeDark), fc);     // edge facing away
      col = over(fc, col);
      vec4 c = ink(p);
      c.rgb *= (1.0 - shade);
      col = over(c, col);
    }
  }

  // ---- the curl -----------------------------------------------------------
  if (x >= 0.0 && x < uR) {
    float aa = smoothstep(uR, uR - 1.5 * uPx, x);
    float sn = clamp(x / uR, 0.0, 1.0);
    float th1 = asin(sn);
    float th2 = PI - th1;
    // lower half of the roll: printed face, self-shadowed inside the curl
    vec3 nf = vec3(-sin(th1) * uD, cos(th1));
    col = over(liftedLayer(src(p, x, uR * th1), nf, false, mix(0.9, 0.5, sn * sn)) * aa, col);
    // upper half: adhesive side
    vec3 nb = vec3(sin(th2) * uD, -cos(th2));
    float roll = mix(0.86, 1.0, smoothstep(0.0, 0.55, cos(th1)));
    col = over(liftedLayer(src(p, x, uR * th2), nb, true, roll) * aa, col);
  } else if (x < 0.0) {
    // flap folded back over the sticker
    col = over(liftedLayer(src(p, x, PI * uR - x), vec3(0.0, 0.0, 1.0), true, 1.0), col);
  }

  gl_FragColor = col;
}
`;

function compile(gl: WebGLRenderingContext, type: number, srcText: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, srcText);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error('PeelSticker shader error: ' + log);
  }
  return s;
}

function norm3(v: number[]): [number, number, number] {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / l, v[1] / l, v[2] / l];
}

export interface PeelStickerOptions {
  src: string;
  dieCutSrc: string;
  filmShadow: number;
  alt: string;
  angle: number;
  peel: number;
  radius: number;
  backColor: string;
  shadow: number;
  gloss: number;
  lightAngle: number;
  lightElevation: number;
  padding: number;
  trigger: 'auto' | 'hover' | 'scroll' | 'manual';
  /** element whose hover / focus drives the peel (defaults to the container) */
  hoverTarget: HTMLElement | null;
  holdMs: number;
  replay: boolean;
  stiffness: number;
  damping: number;
}

export interface PeelStickerInstance {
  setPeeled(on: boolean): void;
  setProgress(v: number): void;
  destroy(): void;
}

const DEFAULTS: PeelStickerOptions = {
  src: '',
  dieCutSrc: '',       // die-cut mask PNG (alpha = sticker outline). Omit for no clear border.
  filmShadow: 0.2,     // how much light the clear film blocks
  alt: '',
  angle: -24,          // peel direction in degrees (0 = right, -90 = up); -24 = bisector of the YEARS tab corner
  peel: 0.187,         // how far the corner lifts, as a fraction of the sticker's span
  radius: 0.03,        // curl radius, as a fraction of image width
  backColor: '#dcdcda',// underside colour
  shadow: 0.62,        // shadow strength 0..1
  gloss: 0.35,         // specular on the printed face inside the curl
  lightAngle: 232,     // light azimuth in degrees (232 ≈ top left)
  lightElevation: 52,  // light elevation in degrees
  padding: 0.07,       // canvas overflow around the image for shadows (fraction of width)
  trigger: 'auto',     // 'auto' | 'hover' | 'scroll' | 'manual'
  hoverTarget: null,   // element whose hover drives the peel (defaults to the container)
  holdMs: 1400,        // scroll trigger: how long the corner stays up
  replay: true,        // scroll trigger: replay each time it re-enters the viewport
  stiffness: 210,
  damping: 20,
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function createPeelSticker(
  container: HTMLElement,
  options: Partial<PeelStickerOptions> = {}
): PeelStickerInstance {
  const o = { ...DEFAULTS, ...options };
  const reduceMotion =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover =
    typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;
  const mode = o.trigger === 'auto' ? (canHover ? 'hover' : 'scroll') : o.trigger;

  container.style.position = container.style.position || 'relative';

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, { position: 'absolute', display: 'block', pointerEvents: 'none' });
  container.appendChild(canvas);

  const glMaybe = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  let destroyed = false;
  const cleanups: (() => void)[] = [];

  function fallback(): PeelStickerInstance {
    canvas.remove();
    const img = document.createElement('img');
    img.src = o.src;
    img.alt = o.alt;
    Object.assign(img.style, { width: '100%', height: 'auto', display: 'block' });
    container.appendChild(img);
    return { setPeeled() {}, setProgress() {}, destroy() { img.remove(); } };
  }
  if (!glMaybe) return fallback();
  const gl: WebGLRenderingContext = glMaybe;

  let prog: WebGLProgram;
  try {
    prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link failed");
  } catch (e) {
    console.warn(e);
    return fallback();
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const U: Record<string, WebGLUniformLocation | null> = {};
  ['uTex', 'uFilm', 'uFilmShadow', 'uSize', 'uPad', 'uD', 'uL', 'uR', 'uLight', 'uLs', 'uBack', 'uPx', 'uShadow', 'uGloss'].forEach(
    (n) => (U[n] = gl.getUniformLocation(prog, n))
  );

  // light + area-light jitter
  const az = (o.lightAngle * Math.PI) / 180;
  const el = (o.lightElevation * Math.PI) / 180;
  const light = norm3([Math.cos(az) * Math.cos(el), Math.sin(az) * Math.cos(el), Math.sin(el)]);
  const ls: number[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + 0.3;
    const r = i % 2 ? 0.16 : 0.08;
    ls.push(...norm3([light[0] + Math.cos(a) * r, light[1] + Math.sin(a) * r, light[2]]));
  }
  gl.uniform3fv(U.uLight, light);
  gl.uniform3fv(U.uLs, ls);
  gl.uniform3fv(U.uBack, hexToRgb(o.backColor));
  gl.uniform1f(U.uShadow, o.shadow);
  gl.uniform1f(U.uGloss, o.gloss);
  gl.uniform1i(U.uTex, 0);
  gl.uniform1i(U.uFilm, 1);
  gl.uniform1f(U.uFilmShadow, o.filmShadow);

  let W = 1, H = 1, pad = 0, Lmin = 0, Lmax = 0, ready = false;
  let progress = 0, velocity = 0, target = 0, raf = 0, last = 0;

  const ang = (o.angle * Math.PI) / 180;
  const D = [Math.cos(ang), Math.sin(ang)];

  function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const im = new Image();
      im.crossOrigin = 'anonymous';
      im.decoding = 'async';
      im.onload = () => resolve(im);
      im.onerror = reject;
      im.src = url;
    });
  }

  function upload(unit: number, source: HTMLImageElement) {
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }

  Promise.all([loadImage(o.src), o.dieCutSrc ? loadImage(o.dieCutSrc) : null])
    .then(([img, cut]) => {
      if (destroyed) return;
      W = img.naturalWidth;
      H = img.naturalHeight;
      pad = Math.round(W * o.padding);
      const shape = cut || img; // the physical sticker outline

      // measure the sticker's extent along the peel direction
      const sc = Math.min(1, 300 / W);
      const c2 = document.createElement('canvas');
      c2.width = Math.max(1, Math.round(W * sc));
      c2.height = Math.max(1, Math.round(H * sc));
      const ctx = c2.getContext('2d')!;
      ctx.drawImage(shape, 0, 0, c2.width, c2.height);
      let data: Uint8ClampedArray | null = null;
      try { data = ctx.getImageData(0, 0, c2.width, c2.height).data; } catch (e) { /* tainted */ }
      Lmin = Infinity; Lmax = -Infinity;
      if (data) {
        for (let y = 0; y < c2.height; y++)
          for (let x = 0; x < c2.width; x++)
            if (data[(y * c2.width + x) * 4 + 3] > 100) {
              const d = ((x + 0.5) / sc) * D[0] + ((y + 0.5) / sc) * D[1];
              if (d < Lmin) Lmin = d;
              if (d > Lmax) Lmax = d;
            }
      }
      if (!isFinite(Lmin)) {
        const pts = [[0, 0], [W, 0], [0, H], [W, H]].map(([x, y]) => x * D[0] + y * D[1]);
        Lmin = Math.min(...pts); Lmax = Math.max(...pts);
      }
      Lmax += 1 / sc;

      upload(0, img);
      upload(1, shape);
      gl.uniform2f(U.uSize, W, H);
      gl.uniform1f(U.uPad, pad);
      container.style.aspectRatio = `${W} / ${H}`;
      ready = true;
      resize();
    })
    .catch((e) => console.warn('PeelSticker: image failed to load', e));

  function resize() {
    if (!ready) return;
    const cssW = container.clientWidth || W;
    const scale = cssW / W;
    const padCss = pad * scale;
    Object.assign(canvas.style, {
      left: `${-padCss}px`, top: `${-padCss}px`,
      width: `${cssW + 2 * padCss}px`, height: `${(H + 2 * pad) * scale}px`,
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pw = Math.min(2400, Math.round((cssW + 2 * padCss) * dpr));
    canvas.width = pw;
    canvas.height = Math.round(pw * (H + 2 * pad) / (W + 2 * pad));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(U.uPx, (W + 2 * pad) / canvas.width);
    draw();
  }

  function draw() {
    if (!ready) return;
    const t = progress;
    const R0 = o.radius * W;
    const tc = Math.max(0, t);
    const R = R0 * (0.45 + 0.55 * Math.min(tc, 1.2));
    const span = Lmax - Lmin;
    const L = Lmax - t * o.peel * span;
    gl.uniform2f(U.uD, D[0], D[1]);
    gl.uniform1f(U.uL, L);
    gl.uniform1f(U.uR, t > 0.001 ? R : 0.0);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function tick(now: number) {
    const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
    last = now;
    // critically-ish damped spring with a touch of overshoot
    const f = -o.stiffness * (progress - target) - o.damping * velocity;
    velocity += f * dt;
    progress += velocity * dt;
    draw();
    if (Math.abs(progress - target) < 0.0005 && Math.abs(velocity) < 0.0005) {
      progress = target; velocity = 0; draw(); raf = 0; return;
    }
    raf = requestAnimationFrame(tick);
  }

  function setPeeled(on: boolean) {
    target = on ? 1 : 0;
    if (reduceMotion) { progress = target; draw(); return; }
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
  }

  // ---- triggers -------------------------------------------------------------
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
  if (ro) { ro.observe(container); cleanups.push(() => ro.disconnect()); }
  else { window.addEventListener('resize', resize); cleanups.push(() => window.removeEventListener('resize', resize)); }

  if (mode === 'hover') {
    const target = o.hoverTarget || container;
    const on = () => setPeeled(true);
    const off = () => setPeeled(false);
    target.addEventListener('pointerenter', on);
    target.addEventListener('pointerleave', off);
    target.addEventListener('focusin', on);
    target.addEventListener('focusout', off);
    cleanups.push(() => {
      target.removeEventListener('pointerenter', on);
      target.removeEventListener('pointerleave', off);
      target.removeEventListener('focusin', on);
      target.removeEventListener('focusout', off);
    });
  } else if (mode === 'scroll' && !reduceMotion) {
    let armed = true, timer = 0;
    const play = () => {
      setPeeled(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setPeeled(false), o.holdMs);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.intersectionRatio >= 0.6 && armed) { armed = false; window.setTimeout(play, 150); }
        else if (e.intersectionRatio === 0 && o.replay) armed = true;
      }),
      { threshold: [0, 0.6] }
    );
    io.observe(container);
    container.addEventListener('click', play); // tap to replay
    cleanups.push(() => { io.disconnect(); window.clearTimeout(timer); container.removeEventListener('click', play); });
  }

  return {
    setPeeled,
    /** jump straight to a progress value 0..1 (handy for testing / scroll-scrubbing) */
    setProgress(v: number) { progress = v; target = v; velocity = 0; draw(); },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
      canvas.remove();
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    },
  };
}
