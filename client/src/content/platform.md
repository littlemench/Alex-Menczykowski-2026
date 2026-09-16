# Internal Data Platform

---

## Meta

- **title**: Publishing Data Platform
- **subtitle**: [A new generation of data processing tools for the Kobalt music group]
- **client**: Kobalt Music Group
- **year**: 2024–Present
- **role**: Lead Product Designer
- **tags**: Product Design, Strategy, Internal Tools

---

## Proof Points

<!-- 3 sections, each with a title and 2+ data points. -->

### [Onboarding & Ingestion]

- **value**: [98%]
  **label**: [Catalog]
  **note**: [98% of amra's catalogue now ingested through the rebuilt pipeline in FY26, up from a fully manual baseline]

- **value**: [60]
  **label**: [Micro-ingestions]
  **note**: [Throughput scaled to ~60 micro-ingestions a day, with +170% adoption growth quarter-on-quarter across 96k Kobalt ingestions]

- **value**: [>1m]
  **label**: [Works]
  **note**: [Handled the largest automated ingestion to date, alongside a new wave of varied-format partner data and rising KOSIGN volume]

### [Catalog Data Quality]

- **value**: [$52m]
  **label**: [Value unlocked]
  **note**: [~$52m in value unlocked (UVI) by processing roughly 95% of cluster value from under 9% of total volume]

- **value**: [45%]
  **label**: [Deduplication time]
  **note**: [Median merge time cut 45% for song de-duplication (3.7 → 2.1 minutes) and 60% for writer de-duplication (5 → 2 minutes)]

  - **value**: [190%]
  **label**: [Increase]
  **note**: [Processed clusters up 190% half-on-half (1,321 in H2 vs. 450 in H1)]

### [Usage & Royalties]

- **value**: [25%]
  **label**: [Volume]
  **note**: [~400k decisions auto-matched in the first 1.5 months — around 25% of total manual matching volume]

- **value**: [800k]
  **label**: [Value]
  **note**: [~$800k in value cleared through the royalty auto-matching pipeline since its July 2025 launch]

- **value**: [100k]
  **label**: [Uplift]
  **note**: [$100k in claim uplift and an 8% increase in usage matches attributed to the new capabilities, both within the first 1.5 months]

---

## Context

<!-- 1–3 paragraphs setting the scene. What was the product? What was the opportunity? -->

Ingesting, processing and registering music metadata is a complex, often protracted process. At Kobalt the same monolithic system has been used for over 20 years, without any meaningful change. But an internal re-platforming unlocked a sequence of (ongoing) projects to redefine workflows and tooling in a post-automation world across multiple business verticals. 

More recently the workflows enabling rapid design, deployment and iteration of tools have been transformed in recent month with a revised approach to prototyping, component design, implementation & maintenance through a centralised platform function revamped for the agentic landscape.  

The first phase of tools are now the primary mechanism for the ingestion and optimisation of catalog and associated metadata across our two main business units - Kobat and amra - and form the basis of a platform that’s being continually refined and grown by squads across the business.

---

## The Real Problem

<!-- The harder, underlying challenge beneath the surface brief. -->

Aside from the complexity in subject matter and sensitivity for risk or error, the main challenges were two fold. 

Firstly, the level of trust in our stakeholder and user groups was low, ultimately rooted in the desired shift from an exhaustive analog workflow to an automation-first, ‘human in the loop’ approach, compounded by a lack of tolerance for the iterative approach required to define and deliver value. 

Secondly, the lack of front-end and ‘craft’ based expertise in the engineering function meant that the output was at risk of being rudimentary, unintuitive, and inconsistent - ultimately further reducing the risk of adoption in an already suspicious audience. 

All of this was exacerbated by the fact that we were attempting to replace a complex & monolithic legacy database, a catalogue growing at roughly 4x its historic rate, and a sudden wave of unfamiliar file formats from new partners — all landing on operations teams who were already stretched thin on manual data-quality work.

---

## My Role

<!-- What you specifically did. Keep it first-person and concrete. -->

Design lead across the platform, partnering with operations, engineering, and product leadership. I was ultimately accountable for defining and designing workflows across each pillar, either through operating as an IC or overseeing additional designers brought in as surge resource. 

We worked closely with  SME operators to separate genuine business rules from inherited habit, with product managers to and sequencing the work toward whichever pillar would unblock operations teams fastest, and with engineers to shape a component registry that could be applied seamlessly across both business units by engineers with low confidence in front end development. 

---

## Carousel

<!-- Each slide represents a key screen, flow, or moment. Title + description + image placeholder label. -->

### Slide 1

- **title**: [Slide title]
- **description**: [What this screen or flow shows and why it matters]
- **imageLabel**: [Platform — Slide 1]

### Slide 2

- **title**: [Slide title]
- **description**: [What this screen or flow shows and why it matters]
- **imageLabel**: [Platform — Slide 2]

### Slide 3

- **title**: [Slide title]
- **description**: [What this screen or flow shows and why it matters]
- **imageLabel**: [Platform — Slide 3]

---

## Strategy, Tradeoffs and Key Decisions

<!-- Intro paragraph + bulleted list of the specific choices made and why. -->

Whilst the challenge of building tooling that worked accurately and was accessible and effective for users was critical, the conditions and processes surrounding the new tools proved to be an even bigger challenge. 

- Shifting to an automation first approach, and working closely with engineers and SME’s to define thresholds - ensuring what was automated was done so with confidence, routing more complex decisions to specialists - a genuinely complex political and cultural challenge.
- Aligning on an approach to catalogue clean-up backlog by value, not volume - accepting that most clusters would stay untouched for longer, in exchange for unlocking the majority of value fast - again, an extremely culturally sensitive issue.
- Defining and implementing a design language and interaction library that could be applied across both business units with minimal differentiation to reduce risk and effort when deploying between organisations.

---

## Reflection

<!-- 1–2 paragraphs. What did this project teach you? What would you do differently? -->

The hardest part of all of this was never the interface work. It was sequencing trust across a legacy system and a cautious organisation, one business process at a time. Automating the obvious cases turned out to be the easy part. But the work relating to cultural and process shifts were by far the most sensitive and enduring challenges we faced, shifting from an exhaustive approach to data ingestion and cleanup to one where users were required to assess and refine the approach taken to automation, and take personal responsibility for the more complex instances. 

If we were starting again tomorrow, I have no doubt that we’d put more effort into collaborating with non-technical teams to align on a clear vision, and educate them around the steps and journey we’d need to go on required to get there. Setting - and managing expectations - goes a long way when the work is rooted in process and culture, not just design and technology.