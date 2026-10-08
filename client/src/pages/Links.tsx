import Layout from "@/components/Layout";

const links = [
  { label: "Email", href: "mailto:alex.menczykowski@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alexmenczykowski/" },
  { label: "Instagram", href: "https://www.instagram.com/alex.mench/" },
  { label: "Twitter", href: "https://x.com/Alex_Mench" },
  { label: "Radio", href: "http://mixcloud.com/minimumshuffle/" },
  { label: "Current rotation", href: "https://open.spotify.com/playlist/12rZqPp2b5AsmtlckEgBwr?si=ffd09e59c045455e" },
  { label: "Photography", href: "http://shots.photography/" },
];

export default function Links() {
  return (
    <Layout>
      <section className="layout-grid">
        <div className="content-width space-y-1">
          {links.map(({ label, href }) => (
            <p key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="hover:underline"
              >
                {label}
              </a>
            </p>
          ))}
        </div>
      </section>
    </Layout>
  );
}
