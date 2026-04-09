# BuildParty — Agent Strategy
**Internal Strategy Document · April 2026 · Dreamable Inc.**

> Five agents. One live operating layer. Every session becomes smarter, every launch becomes bigger, every moment of community intelligence gets captured, amplified, and activated.

---

## Agent Naming & Identity: The Constellation

All five agents are named from the natural world — celestial phenomena, orbital mechanics, signal physics. Each name captures both the agent's personality and function. They operate invisibly in the background, like forces of nature.

| Agent | Role | Name Rationale |
|-------|------|---------------|
| **Nova** | AI Host | A nova is a stellar explosion of energy and light — commanding, illuminating, center of attention. Nova orchestrates and energizes every room. |
| **Echo** | Session Memory | An echo captures and repeats what matters — perfect recall, persistent signal. Echo ensures nothing said in a session is ever lost. |
| **Orbit** | Build Buddy | An orbit is a stable, reliable path around a center — always present, always helpful, never intrusive. Orbit circles builders as they code. |
| **Flare** | Media Agent *(New)* | A solar flare is an explosive burst of radiant energy that propagates outward at speed. Flare takes session content and sends it into the world — fast, bright, and far-reaching. |
| **Apex** | Launch Agent *(New)* | The apex of a trajectory is the highest point — the moment a rocket achieves maximum altitude. Apex orchestrates every product launch to reach its highest possible outcome. |

---

## Coordinated Build Roadmap

| Phase | Goal | Agents Live |
|-------|------|------------|
| **MVP** | Validate the loop — prove live sessions create meaningful post-session value | Nova (full), Echo (full), Orbit (lite/optional), Flare (not yet), Apex (parallel pilot) |
| **V1** | Full session intelligence — all five agents live for the first time | Nova (enhanced), Echo (+ personalized follow-up), Orbit (full CoBuild), Flare (V1 — text + assets), Apex (V1 — PH-focused D-14→D+7) |
| **V2** | Community & program platform — deeper capabilities, full launch arc | Nova (adaptive persona), Echo (builder identity), Orbit (challenges + templates), Flare (video highlights, dynamic @callouts), Apex (full D-30→D+30 arc, multi-platform) |
| **V3** | Live operating layer — infrastructure and network at scale | Nova (ecosystem-aware personas), Echo (community knowledge graph), Orbit (custom partner personas), Flare (cross-community syndication), Apex (accelerator licensing, fully agentic) |

---

## Agent 1: Nova — AI Host

**Role:** Room Orchestration & Moderation
**Availability:** MVP through V3
**Visibility:** Semi-visible — present in the session UI as an active participant, operating intelligently in the background

Nova is the heartbeat of every BuildParty session — orchestrating room dynamics, managing introductions, moderating Q&A, setting the stage for live learning, and acting as the intelligent bridge between what happens in a room and what gets captured, amplified, and acted on.

Nova is the **master signal router** — the only agent present in all session types. Everything downstream of Nova depends on the quality of its moment detection and briefing.

### Core Capabilities

#### Room Orchestration

**Session Staging**
Manages pre-session countdown, introduces the host and guests, sets the stage framing for the program type (Demo Night vs. Launch Session vs. Office Hours). Adapts its tone to context.

**Introductions & Participant Welcomes**
Greets new attendees as they join, introduces them contextually based on their builder profile. Recognizes returning community members and notable guests.

**Timing & Agenda Management**
Monitors session agenda, gives hosts soft nudges when segments run long, announces transitions between parts of the session without disrupting flow.

**Engagement Amplification**
Surfaces high-engagement moments — a burst of reactions, a great question, an unexpected demo result — and highlights them in the session feed to create shared energy peaks.

#### Q&A & Moderation

**Intelligent Q&A Queue**
Clusters similar questions, surfaces the highest-quality ones, de-duplicates, and prioritizes based on upvotes and context. Provides hosts with a curated question feed, not a firehose.

**Moderation Support**
Flags off-topic or disruptive content, handles community guideline violations with configurable escalation paths. Host approves final actions.

**Moment Detection & Flagging**
Identifies exceptional moments — a great question, a builder struggling, a surprise insight — and flags them for Echo to capture and Flare to potentially amplify. The connective tissue of the agent system.

#### Cross-Agent Intelligence (Nova as Router)

**Echo Handoff**
When Nova detects a notable moment — great question, breakthrough answer, key decision — it explicitly signals Echo to tag and preserve that moment in session memory with full context.

**Flare Brief Creation**
After session end, Nova passes a structured brief to Flare: key moments, speaker highlights, notable participant kudos (e.g. "Glenn Kohner asked a great question — tag him"), quotable insights, and recommended content angles.

**Orbit Context Sharing**
During CoBuild sessions, Nova provides Orbit with attendee context — who's working on what, their skill level, their stated goals — so Orbit can give personalized coding support without re-asking.

### ADLC (Agent Development Lifecycle)

| Phase | Capabilities |
|-------|-------------|
| **MVP** | Host timing, basic intro messages, Q&A queue, Echo handoff signals, end-of-session brief |
| **V1** | Participant recognition, agenda rail management, Flare brief generation, engagement detection |
| **V2** | Adaptive persona per session type, multi-host support, moment scoring, cross-session context memory |
| **V3** | Ecosystem-aware hosting (adapts to ElevenLabs vs. Stanford vs. Anthropic community), predictive moderation, multi-agent orchestration master |

### Connects To
- **Echo** — passes moment tags & context for memory capture
- **Flare** — delivers post-session brief with kudos & highlights
- **Orbit** — shares participant context for personalized build support

---

## Agent 2: Echo — Session Memory

**Role:** Context Capture & Personalized Follow-Up
**Availability:** MVP through V3
**Visibility:** Invisible during sessions, visible afterward — participants experience Echo's value in the follow-up

Echo is the institutional memory of BuildParty — capturing every session in full fidelity, surfacing what mattered, enabling every participant to leave with exactly what they need, and providing hosts with a living record of their community's knowledge and participation over time.

Echo is the **truth record** — everything else is downstream of Echo's capture.

### Core Capabilities

#### Live Capture

**Real-Time Summarization**
Generates a running summary of session content as it happens — key points discussed, decisions made, questions raised and answered. Available to host and participants mid-session.

**Code Snippet Capture**
In CoBuild and builder sessions, automatically records code snippets that are shared, discussed, or demoed. Timestamps them, links to the session context, and makes them searchable.

**Moment Tagging (Nova-fed)**
Receives signal from Nova when exceptional moments occur — a great question from @glennkohner, a surprising product reveal, a breakthrough debug — and captures those moments with rich context for post-session use.

#### Post-Session Outputs

**Session Recap Document**
Generates a structured recap: summary, key takeaways, notable quotes, action items, links shared, code snippets, participant contributions. Delivered to host within minutes of session end.

**Personalized Follow-Up Messages**
Generates personalized post-session notes for each participant: "Here's what you asked about, here are the resources mentioned, here's the code snippet from your question." Dramatically increases perceived value of attendance.

**Session Archive & Search**
Every session recap is stored, indexed, and searchable within the community. Hosts can search across their program history. Community members can find sessions by topic.

#### Long-Term Memory

**Builder Identity & History** *(V2+)*
Echo builds a profile of each builder's participation over time — what they've built, what questions they ask, what sessions they attend, how they contribute. Powers personalization across the platform.

**Community Knowledge Graph** *(V3)*
Maps the topics, skills, and connections that emerge across a community's sessions over time. Surfaces insights to hosts: "Your community asks about X constantly but you've never done a session on it."

### ADLC (Agent Development Lifecycle)

| Phase | Capabilities |
|-------|-------------|
| **MVP** | Session summaries, code snippet capture, basic recap document, moment tagging from Nova |
| **V1** | Personalized follow-up messages, session archive, host recap dashboard, Flare asset handoff |
| **V2** | Builder identity/history, program-level memory (threaded across sessions), community FAQ generation |
| **V3** | Community knowledge graph, cross-community memory (with permission), predictive program planning signals |

### Connects To
- **Nova** — receives moment-tag signals and context briefs
- **Flare** — delivers raw assets, quotes, highlights for content creation
- **Apex** — provides session transcript and context for launch briefings

---

## Agent 3: Orbit — Build Buddy

**Role:** Live Context-Aware Coding Support
**Availability:** MVP-lite, full in V1
**Visibility:** Opt-in visible — sidebar presence in the CoBuild environment; builders can summon it or let it operate passively

Orbit lives inside the CoBuild environment — always present, never intrusive. It watches what builders are doing, understands the session context, and provides exactly the right coding guidance at exactly the right moment. Think of it as having a senior engineer on call, who already knows what everyone in the room is building.

### Core Capabilities

#### Live Coding Support

**Context-Aware Code Assistance**
Orbit understands the current session topic, the tools being taught, and the builder's stated project. Suggestions and explanations are always scoped to the session context — not generic.

**Error Triage & Debug Support**
When a builder hits an error, Orbit steps in with relevant context. "This error is common when setting up MCP with Node 20 — here's the fix." Fast, specific, no rabbit holes.

**Session-Scoped Documentation**
During tool-specific sessions (ElevenLabs, LiveKit, etc.), Orbit is pre-loaded with the relevant SDK docs and examples, making it a session-native reference, not a generic search engine.

#### Participant Intelligence

**Skill-Level Adaptation**
Orbit receives participant context from Nova and adjusts the depth and style of its guidance accordingly. No over-explaining to senior devs, no abandoning beginners.

**Intelligent Participant Matching** *(V1+)*
Identifies when a builder is struggling and whether another participant has relevant expertise. "Three people in this session have shipped MCP servers — would you like to connect with one?"

**Build Challenge Integration** *(V2+)*
In challenge/competition sessions, Orbit monitors build progress, provides encouragement and hints aligned with challenge rules, and surfaces leaderboard context.

#### CoBuild Environment

**Code Snippet Management**
Works with Echo to ensure every useful code snippet shared during a session is captured, formatted, and made available to all participants. Orbit knows which snippets are relevant to which builders.

**Live Template Injection** *(V2+)*
For standardized workshops, Orbit can inject starter templates, boilerplate, and scaffolding into builder environments at the right moment — reducing friction, increasing completion rates.

### ADLC (Agent Development Lifecycle)

| Phase | Capabilities |
|-------|-------------|
| **MVP** | Optional/limited — basic in-session Q&A bot. Low-key presence in CoBuild sessions |
| **V1** | Full CoBuild integration, context-aware code help, skill-level adaptation, participant matching, error triage |
| **V2** | Challenge integration, live template injection, cross-session learning history, tool-ecosystem pre-loading |
| **V3** | Deep builder identity integration, certification support, custom Orbit personas for ecosystem partners (e.g. "ElevenLabs Orbit") |

### Connects To
- **Nova** — receives participant context and session framing
- **Echo** — collaborates on code snippet capture and preservation

---

## Agent 4: Flare — Media Agent *(New)*

**Role:** Viral Content Creation & Distribution
**Availability:** V1 through V3 (not in MVP)
**Visibility:** Fully invisible — operates entirely post-session, outputs appear in community owner's publishing queue

Flare is the distribution engine. Every session generates a wave of content — highlight reels, quote cards, social posts, recap threads — and Flare ensures that wave actually reaches the world, minutes after a session ends, tailored to each platform, personalized to the community's preferences, and smart about who to credit and how.

### Core Capabilities

#### Content Creation

**Highlight Reel Generation**
Automatically creates short-form video highlights from session recordings — the best 60–90 seconds, structured for TikTok, LinkedIn, or YouTube Shorts. Optimized per platform format.

**Quote Card Creation**
Pulls the most quotable moments from Echo's session memory and generates on-brand quote cards for the session host — ready to post within minutes of session end.

**Thread & Post Generation**
Generates platform-native post formats: Twitter/X threads, LinkedIn session summaries, Substack recap sections. Editable before publish.

**Reusable Asset Pack**
Produces a shareable asset pack per session: recap PDF, event graphic, speaker cards, announcement templates for the next session. Dramatically reduces community manager effort.

#### Smart Personalization & Kudos

**Standard Kudos Insertion**
Every post automatically includes configured kudos — hosts, sponsors, venue partners, community leads. Host sets the template once; Flare handles the rest every time.

**Dynamic Participant Callouts** *(The Standout Feature)*
When Nova flags a great question from @glennkohner or a notable contribution from any participant, Flare strategically integrates a personalized mention in the post-session content: *"Special kudos to Glenn Kohner for the sharpest question of the night."* This creates genuine community recognition and massive amplification as mentioned participants reshare. The entire signal chain: Nova detects → Echo tags → Flare publishes → participant reshares → community grows.

**Community Owner Preferences**
Session lead and community owner configure tone, brand voice, post frequency, and platform preferences once. Flare respects these across every session — no re-configuring per post.

#### Distribution

**Multi-Platform Publishing**
Publishes to LinkedIn, Twitter/X, YouTube Shorts, TikTok, Instagram Reels, Substack, and Beehiiv — coordinated timing, platform-native format, manual approval mode available.

**Rapid Turnaround**
Core post-session content ready within 5–10 minutes of session end. Hosts can review, edit, and publish in one click.

**Distribution Analytics** *(V2+)*
Tracks reach, engagement, and reshare rates per post per platform. Community owners see which content formats drive the most next-session RSVPs — closing the distribution loop.

### ADLC (Agent Development Lifecycle)

| Phase | Capabilities |
|-------|-------------|
| **Pre-MVP** | Not in scope |
| **V1** | Post-session text content (LinkedIn, Twitter), kudos system, quote cards, manual review before publish, basic asset pack |
| **V2** | Highlight reel video generation, dynamic participant callouts, community preferences engine, multi-platform scheduling, distribution analytics |
| **V3** | Apex integration (launch-specific amplification), cross-community viral content syndication, brand partnership/sponsor content modules |

### Platforms
LinkedIn · Twitter/X · YouTube Shorts · TikTok · Instagram Reels · Substack · Beehiiv

### Connects To
- **Nova** — receives highlight brief, kudos flags, notable moments list
- **Echo** — pulls quotes, summaries, code snippets, session context
- **Apex** — collaborates on launch-day social amplification campaigns

---

## Agent 5: Apex — Launch Agent *(New)*

**Role:** Full-Arc Product Launch Orchestration
**Availability:** V1 through V3 (not in MVP — developed as parallel pilot)
**Visibility:** Fully visible to the founder — operates as a persistent launch dashboard and advisor

Apex is the full-arc launch director — starting 30 days before launch day and running for 30 days after. Not a checklist. Not a copy generator. A persistent, proactive agent that plans, executes, monitors, and compounds the momentum of every product launch across Product Hunt, Show HN, Microlaunch, BuildParty, and all major social channels simultaneously.

### Core Capabilities

#### Pre-Launch Phase (D-30 to D-1)

**Market & Competitive Intelligence**
Scans the competitive landscape, identifies ICP, builds positioning framework, and creates a Notion database of competitive intelligence, pricing models, and messaging frameworks. Inspired by the 11-step launch plan (Jason Oakley / Aakash Gupta framework).

**Launch Asset Production**
Generates all launch assets: Product Hunt listing (tagline, description, gallery brief), email templates, social post sequences, press kit, demo video brief, sales enablement one-pager, landing page copy review.

**Hunter & Community Outreach Management**
Identifies relevant Product Hunt hunters based on category and network, manages outreach timing (D-7 window), builds warm-up audience across relevant communities (YC Alumni, Large People Model, r/SaaS, Discord servers).

**Launch Calendar & Milestone Tracking**
Creates and maintains the full launch timeline: assets due, outreach windows, PH submission timing, BuildParty launch event scheduling, press embargo dates, social content calendar.

#### Launch Day Execution (D-0)

**Multi-Platform Simultaneous Launch**
Coordinates launch across all relevant platforms: Product Hunt (midnight PST timing), Show HN (optimal weekday timing), Microlaunch, BuildParty live launch event, Betalist. Adapts copy per platform natively.

**Real-Time Launch Dashboard**
Gives founders a live view: PH rank, upvote trajectory, social share count, website traffic spike, signups vs. goal. Anomaly detection triggers alerts: "You're trending down, here's why and what to do."

**Community Response Management**
Monitors and drafts responses to PH comments, Hacker News replies, and social mentions. Founder reviews and approves — human-in-the-loop for authentic engagement at machine scale.

**Social Cadence Execution (with Flare)**
Coordinates with Flare for launch-day social amplification — update posts at key milestones (#Top10!, #Top5!, Product of the Day!), community call-to-action posts, personal network outreach sequences.

#### Post-Launch Momentum (D+1 to D+30)

**Secondary Platform Launch Cascade**
After PH day: triggers Indie Hackers post, G2/Capterra review solicitation, Microlaunch (if not yet launched), community-specific posts for niche audiences. Each platform gets optimized native content.

**Feedback Synthesis & Iteration Brief**
Aggregates user feedback from PH comments, early user emails, and support tickets into a structured brief: top requested features, top friction points, conversion blockers. Delivered to founder by D+3.

**Non-Converter Follow-Up**
Identifies users who signed up but didn't activate, or visited but didn't sign up. Generates personalized re-engagement sequences with context from the launch moment.

**BuildParty Launch Event Integration** *(The Unfair Advantage)*
Coordinates a live BuildParty launch event as part of the launch package — demo session with real-time Q&A, community voting, creator amplification. The exclusive capability no PH listing alone provides. Nova hosts the event, Echo recaps it, Flare amplifies it.

#### Additional Capabilities (Stimpack-Inspired)

**Battle-Tested Launch Checklists**
Apex maintains a living, learnable checklist updated from every launch it manages. Every new launch inherits the lessons of every previous one. Success patterns compound.

**Cross-Channel Mix Optimization**
Analyzes the product, audience, and goals to recommend the right channel mix — not a one-size playbook.

**Per-Launch Analytics & Retrospective**
Every launch generates a retrospective report: what worked, what didn't, cost per signup, channel attribution, conversion funnel analysis. Becomes the input for the next launch — and the proprietary dataset that becomes the moat.

### Launch Platforms Managed
Product Hunt · Show HN (Hacker News) · Microlaunch · BuildParty (Live Event) · Indie Hackers · Betalist · Major Socials (via Flare)

### ADLC (Agent Development Lifecycle)

| Phase | Capabilities |
|-------|-------------|
| **Pre-MVP** | Not in scope — developed in parallel as a standalone pilot |
| **V1** | PH-focused launch arc (D-14 to D+7), asset generation, launch dashboard, social cadence, BuildParty event integration |
| **V2** | Full D-30 to D+30 arc, multi-platform launch cascade, feedback synthesis, non-converter follow-up, analytics retrospective |
| **V3** | Accelerator licensing (YC, Techstars), proprietary launch data advantage, full agentic mode (minimal human touchpoints), ClaudeScore credential integration |

### Business Model
- **Per-launch:** $297/launch (core)
- **Subscription:** $79/month (serial founders, studios)
- **Accelerator license:** $999/cohort (YC, Techstars — aligned with Shimmer's existing community relationships)

### Connects To
- **Flare** — social amplification on launch day and post-launch cascade
- **Echo** — BuildParty launch event recap and follow-up generation
- **Nova** — hosts the live BuildParty launch event as part of the package

---

## Agent Coordination Matrix

| Agent | Sends To | Receives From | Shared Capability | Key Handoff Moment |
|-------|---------|--------------|------------------|-------------------|
| **🌟 Nova** | Echo (moment tags), Flare (session brief), Orbit (participant context) | — | Master signal router — the only agent present in all session types | End of session: Nova packages brief → Flare + Echo simultaneously |
| **🌿 Echo** | Flare (raw assets), Apex (transcripts) | Nova (moment tags, context) | The truth record — everything else is downstream of Echo's capture | 5 min post-session: Echo → Flare raw content, Echo → participant inboxes |
| **🔮 Orbit** | Echo (code snippets) | Nova (participant context) | CoBuild environment exclusive — operates independently from broadcast layer | Builder hits error → Orbit steps in → captures solution via Echo |
| **🌊 Flare** | Social platforms (published content) | Nova (highlights, kudos flags), Echo (quotes, summaries) | Distribution multiplier — amplifies everything Nova and Echo capture | Nova kudos flag → Flare dynamic @mention in LinkedIn post = reshare loop |
| **🚀 Apex** | Launch platforms, Flare (social cadence) | Echo (launch event transcript), Nova (live event hosting) | Full-arc launch system — the only agent that operates outside of sessions | Launch day: Apex orchestrates → Flare amplifies → Nova hosts live event → Echo recaps |

---

## Agent Design Philosophy

### Agents Are Active Participants, Not Features

> *"AI agents operate entirely in the background, eliminating operational friction."*
> — BuildParty design principle

**Invisible Intelligence**
Agents operate in the background, eliminating operational friction. The best agent experience is one that feels effortless — the output appears before you realize you needed it.

**Coordinated, Not Siloed**
Each agent has a role, but the system's power comes from coordination. Nova routes. Echo captures. Flare amplifies. Orbit assists. Apex launches. Together, they are a complete operating layer.

**Human-in-the-Loop by Default**
Every consequential agent action — publishing a post, sending outreach, responding to a comment — has a human review step. We augment judgment, we never replace it without permission.

**Compounding Value**
Agents get better with use. Each session adds to Echo's memory. Each launch improves Apex's playbook. The data advantage compounds and becomes the primary moat over time.

**Community-Centric**
Every agent is designed with the community relationship in mind. Flare's dynamic callouts create community belonging. Echo's follow-ups make attendance feel valued. Orbit's matching creates serendipitous connections.

**Aligned to BuildParty's Product Principles**
- Agents are embedded in workflows, not decorative
- Analytics are native from day one
- The MVP validates behavior loops, not just UI concepts
- Agents that don't change behavior don't ship

---

## The Meta-Launch

*Use Apex to launch Apex. Full arc. Live on BuildParty. Nova hosts. Echo recaps. Flare amplifies. Close the loop.*

---

*Dreamable Inc. · BuildParty Internal Strategy · April 2026 · Confidential — Internal Use Only*
