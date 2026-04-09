# BuildParty PRD Reframed

## Executive Summary

BuildParty is not just a live event product. It is a live operating layer for AI builder communities.

The earlier PRD correctly identified the importance of live launch, demo, learning, and agent-native interaction. This revised version sharpens the product around four ideas:

1. **Community is the primary persistent container**, not `space` and not a Discord-like `server`.
2. **Programs sit between communities and sessions** so cohorts, bootcamps, recurring series, and launch weeks have a proper home.
3. **BuildParty can support both partner-run and BuildParty-run programming**, but the platform should host flagship ecosystem programs without directly trying to replace every customer’s core community business.
4. **A reference implementation already exists for baseline realtime communications** using a Discord-style clone built on LiveKit. That meaningfully reduces foundational chat/audio/video risk, but it does not solve the BuildParty product layer.

The resulting object model is:

**Owner -> Community -> Program -> Session**

Examples:

* **ElevenLabs** -> **Voice Builders Community** -> **Launch Week** -> **Launch Day Live Demo**
* **Sabrina Romanov** -> **AI Tools Community** -> **Weekly Live Builds** -> **Sunday Live Build #14**
* **AI Collective** -> **Founder Community** -> **Tools, Tips \& Tricks** -> **April Monthly Session**
* **Stanford AI Club** -> **Student Builder Community** -> **Prompt Engineering Cohort** -> **Week 3 Workshop**

## What Changed From the Original PRD

### What remains true

* BuildParty should still be live-first.
* It should still serve builders, creators, communities, and tool/platform ecosystems.
* It should still feel premium, interactive, and agent-native.
* It should still aim to become a better live layer than Zoom + Discord + YouTube stitched together.

### What now needs to change

#### 1\. Move from generic “live infrastructure” to a clearer product model

The old PRD correctly described a large opportunity, but it blurred together events, classes, communities, creator tools, platform activation, and collaboration.

The new PRD separates these into explicit product objects:

* **Owner**: the entity running the community
* **Community**: the persistent home for a defined group or purpose
* **Program**: a recurring or structured offering
* **Session**: one live experience

#### 2\. Treat cohorts and courses as programs, not just session types

A one-off AMA and an 8-week cohort should not be modeled as the same object. A cohort contains multiple sessions, pricing logic, progression, and often completion criteria.

#### 3\. Recognize that BuildParty may run flagship ecosystem programming

The prior PRD implied BuildParty as a pure platform. The revised version allows three modes:

* **Partner-hosted**
* **BuildParty-hosted**
* **Co-hosted**

This is important for Product Hunt launches, multi-tool challenges, university programming, and ecosystem showcase events.

#### 4\. Incorporate the reference implementation reality

A Discord-style LiveKit-based reference implementation already gives baseline building blocks such as auth, roles, chat, channels, audio/video rooms, invites, and uploads. That reduces foundational realtime engineering risk.

But it does **not** provide:

* event/program/community information architecture
* stage-centric live UX
* launch workflows
* cohort logic
* cross-community discovery
* activation analytics
* creator monetization
* agent-driven orchestration

So the product plan must clearly distinguish:

* **what can be reused from the reference base**
* **what must be redesigned**
* **what must be built net-new**

## Product Thesis

BuildParty is the live platform for AI builder communities to launch, teach, compete, and activate together.

BuildParty sits across four overlapping needs:

1. **Live launch and demo infrastructure**
2. **Structured builder learning and programming**
3. **Community-centered live participation**
4. **Measurable activation and engagement for tool/platform ecosystems**

This means BuildParty is not just:

* a webinar tool
* a community app
* a cohort platform
* a Discord replacement
* a creator course tool

It is the layer that connects those behaviors into one system.

## Community Types to Support

BuildParty should support at least these community types:

1. **Platform-led**: ElevenLabs, LiveKit, LangChain, Anthropic ecosystem communities
2. **Creator-led**: YouTubers, newsletter creators, cohort instructors, AI educators
3. **Organic/community-led**: AI Collective, local founder groups, interest-based builder clubs
4. **Academic**: universities, high school clubs, classes, labs
5. **Company/internal**: internal AI enablement, demo days, hack sessions, launch reviews
6. **Agency/service-led**: consultants, implementation partners, AI agencies
7. **Cohort/program-led**: bootcamps, fellowships, accelerators, workshops
8. **Interest/practice-led**: prompt engineering, no-code AI, AI artists, vibe coding
9. **Industry/vertical-led**: legal AI, healthcare AI, education AI, real estate AI

## Product Objects

### Owner

The entity that owns or operates the top-level presence.

Examples:

* ElevenLabs
* Sabrina Romanov
* AI Collective
* Stanford AI Club
* BuildParty itself

### Community

The persistent home for a defined audience, topic, or purpose.

Examples:

* Voice Builders Community
* AI Tools Community
* Founder Community
* Student Builder Community
* Internal Product Launch Community

### Program

A structured offering or recurring stream of activity inside a community.

Examples:

* Launch Week
* Weekly Office Hours
* Build Relay Series
* Prompt Engineering Cohort
* Tool Certification Track
* Demo Night Series

### Session

A single live experience.

Examples:

* Launch Day Live Demo
* Week 3 Workshop
* Friday Office Hours
* Demo Night #8
* Build Challenge Finals

## Positioning

### Core positioning

BuildParty is the live platform for AI builder communities to launch, teach, compete, and activate together.

### Buyer-facing interpretation

For tool and platform ecosystems, BuildParty is a live activation and learning layer for builder communities.

### Why this framing is stronger than the earlier PRD

The prior language captured ambition, but it risked feeling broad and category-blurry. The revised positioning keeps the same ambition while making the product easier to map to communities, programs, and measurable outcomes.

## Reference Implementation Implications

### What the current reference base plausibly gives us

Using a Discord-style LiveKit-based starter can accelerate:

* authentication
* roles/permissions foundations
* chat plumbing
* audio/video room plumbing
* invites
* uploads/attachments
* baseline realtime state handling
* some community membership and presence concepts

### What must be fully reskinned or re-architected

The reference base should **not** determine BuildParty’s outward product shape.

BuildParty must replace Discord-like assumptions such as:

* server-first mental model
* channel-tree-first navigation
* generic chat-room framing
* Discord terminology
* Discord-like onboarding

### What must be built net-new

* community/program/session data model
* launch-centered workflows
* stage-first layouts
* agenda-driven live sessions
* BuildParty-hosted and partner-hosted programming logic
* cohort progression
* cross-community discovery
* activation analytics and attribution
* challenge/competition flows
* agent-led orchestration and recap surfaces

## Product Principles

1. **Live-first, not content-first**
2. **Community-first, not server-first**
3. **Programs matter, not just one-off sessions**
4. **Builders participate, not just watch**
5. **Agents are embedded in workflows, not decorative**
6. **Analytics are product-native from the beginning**
7. **The product should feel premium and event-native, not like a clone**
8. **The MVP must validate a behavior loop, not just a UI concept**

## Core Behavior Loops

### Builder loop

Discover -> RSVP -> Attend -> Participate -> Build -> Return -> Teach or Demo

### Creator/community loop

Host -> Teach -> Capture recap -> Reuse content -> Grow attendance -> Launch next program

### Platform/tool loop

Launch -> Activate builders -> Measure usage/engagement -> Sponsor more programming -> Retain community

## MVP

### MVP Goal

Validate that AI builder communities want a premium live product for recurring launch, demo, and learning sessions that is meaningfully better than Zoom + Discord + YouTube stitched together.

### MVP wedge

The MVP should **not** try to prove the entire long-term network. It should prove that:

* communities will host recurring live sessions
* builders will attend and return
* live sessions create meaningful post-session value through recap and follow-up
* the product can support launch/demo and teaching use cases in one coherent shell

### MVP core product shape

The MVP should focus on one persistent object model:

**Owner -> Community -> Program -> Session**

### MVP primary community use cases

1. Platform/tool-led community night
2. Creator-led live learning session
3. Organic builder community demo night
4. Early launch-week or Product Hunt companion experience

### MVP included community types

* platform-led
* creator-led
* organic/community-led

Academic, company/internal, and advanced cohort use cases can be tested but should not dominate MVP scope.

### MVP included program types

* Launch Week
* Demo Night Series
* Weekly Office Hours
* Creator Class Series

### MVP included session types

* Launch Session
* Demo Session
* Office Hours / AMA
* Creator Class
* Watch Party / Mainstage

### MVP core features

* community homepage
* program page
* live session page
* stage area
* agenda rail
* chat
* Q\&A
* reaction layer
* roles for host / presenter / attendee
* recap surface
* RSVP / join flow
* session archive lite
* basic analytics

### MVP agent scope

Public-facing:

* **Nova**: host/timing/moderation support
* **Echo**: recap and memory

Limited/optional:

* **Orbit**: lightweight builder assistance

### MVP monetization experiments

* sponsored flagship sessions
* paid pilot communities for tool/platform ecosystems
* limited paid creator series

### MVP non-goals

* full marketplace
* advanced challenge engine
* full course LMS
* full class-pass discovery network
* robust certifications
* advanced cohort progression
* deep external integrations

### MVP success signals

* repeat attendance
* repeat hosting
* communities returning for a second or third program
* recap usage
* session-to-session retention
* tool/platform interest in recurring programming

## V1

### V1 Goal

Turn BuildParty into a reliable product for recurring community programming across launch, demo, office hours, creator-led education, and flagship watch-party formats.

### What changes from MVP to V1

* stronger community homepages
* richer program management
* recurring scheduling templates
* session archives and reusable assets
* better host/producer controls
* better creator and community branding

### V1 includes

* recurring community/program shells
* session templates by program type
* branded community pages
* creator mode
* platform/tool community nights
* early BuildParty-hosted flagship programming
* archive and recap surfaces
* better analytics for organizers

### V1 communities to support explicitly

* platform-led
* creator-led
* organic/community-led
* academic pilot communities

### V1 program types

* Launch Week
* Demo Night Series
* Office Hours
* Cohort Lite
* Creator Bootcamp Lite
* Mainstage Series

### V1 monetization

* paid community subscriptions for hosts or ecosystems
* sponsored programming packages
* ticketed or paid creator programs
* early paid pilots with tool providers

### V1 success signals

* weekly recurring communities
* stronger community return rates
* initial community monetization
* first platform/tool ecosystem customers
* creators preferring BuildParty over generic webinar flow

## V2

### V2 Goal

Expand from recurring sessions into a true community-program platform with stronger learning, collaboration, and monetization.

### V2 strategic shift

This is where **Program** becomes much more important and the product begins to support more serious cohorts, challenges, and cross-community value.

### V2 includes

* real cohort/program progression
* challenge/competition framework
* richer builder identity and history
* cross-community discovery
* instructor/community-led course creation
* revenue sharing for community-led programs
* stronger sponsorship tooling
* community and program dashboards

### V2 community types added more deeply

* academic
* cohort/program-led
* company/internal
* agency/service-led

### V2 program types

* multi-week cohorts
* builder challenges
* tool bootcamps
* certification-lite programs
* community-led workshops
* cross-community showcase series

### V2 monetization

* community plans
* program fees
* cohort tuition
* sponsor-funded challenges
* revenue share on third-party or community-led courses
* partner packages for tool/platform ecosystems

### V2 success signals

* paid cohorts work
* cross-community attendance begins to matter
* community-led teaching emerges naturally
* sponsors/tool providers see measurable value
* builder identity/history improves retention

## V3

### V3 Goal

Become the live operating layer for AI builder communities and ecosystem activation across launches, programs, challenges, learning, and discovery.

### V3 strategic shift

At V3, BuildParty becomes more than a destination. It starts acting like infrastructure and network.

### V3 includes

* robust cross-community discovery
* pass/credit system or class-pass-like access
* strong attribution and revenue-share logic
* network-wide builder identity/progression layer
* platform-specific activation dashboards
* ecosystem-level programming operations
* broader community intelligence and analytics

### V3 product modes

* partner-hosted communities and programs
* BuildParty-hosted flagship communities and ecosystem programs
* co-hosted programs across platforms, creators, schools, and communities

### V3 monetization

* SaaS/community plans
* paid programs and cohorts
* revenue share
* sponsored activation programs
* network passes / credits
* analytics products for ecosystems and platforms

### V3 success signals

* multiple ecosystem customers
* durable recurring programs across multiple community types
* cross-community participation is real, not theoretical
* monetization is diversified
* BuildParty-hosted and partner-hosted programming reinforce one another instead of conflicting

## Product Hunt Auto-Creation Opportunity

This is not required for MVP, but it is a strong early wedge.

### Thesis

Product Hunt gives products a static launch moment. BuildParty can give them an immediate live activation layer.

### Best early version

For selected Product Hunt winners:

* auto-create launch page
* auto-create launch session shell
* optionally create a starter community/program shell
* allow company to claim ownership
* allow BuildParty to operate first session if unclaimed

### Why this matters

It creates a wedge around:

* launch -> live demo
* launch -> challenge
* launch -> workshop
* launch -> community formation

This is much sharper than generic “community creation.”

## BuildParty-Hosted vs Partner-Hosted Programming

### BuildParty should host

* flagship ecosystem programs
* open builder challenges
* cross-community demo days
* university-wide or multi-university programming
* Product Hunt companion launch series

### Partners should host

* official tool communities
* creator-branded communities
* internal/company communities
* branded customer education

### Co-hosting is ideal when

* a partner has audience but not operational bandwidth
* BuildParty wants to seed a new category
* a tool company wants activation without building a whole team first

## Analytics and Measurement

Analytics should be organized by level.

### Session analytics

* attendance
* retention
* chat/Q\&A/reaction activity
* replay usage

### Program analytics

* registration to attendance
* progression through cohort or series
* repeat participation
* completion markers

### Community analytics

* active members
* recurring attendance
* program participation mix
* cross-session retention

### Platform/tool activation analytics

* attendance from a target builder audience
* launch-to-workshop conversion
* workshop-to-repeat-attendance conversion
* challenge participation
* referral or attribution signals where available

### Monetization analytics

* paid programs
* sponsor performance
* host/community earnings
* partner ROI

## What To Remove or De-emphasize From the Earlier PRD

1. Treating all session types as roughly equal from the start.
2. Treating courses/cohorts as just another mode instead of a program layer.
3. Treating BuildParty only as a neutral platform rather than allowing BuildParty-hosted flagship programming.
4. Underestimating the value of a reference implementation for baseline realtime infrastructure.
5. Under-specifying community and program objects.
6. Allowing too many future product modes to blur the MVP.

## Recommended Immediate Planning View

If the team needs a single near-term planning statement, use this:

BuildParty MVP is a premium live product for AI builder communities that supports recurring launch, demo, office hours, and creator-class programs through a community -> program -> session model, with recap, participation, and baseline activation analytics built in.

## Immediate Decisions Still Needed

1. What is the exact first wedge: platform-led, creator-led, or Product Hunt launch companion?
2. Which three program types are in MVP?
3. Which community type is the first design center?
4. Is Orbit visible in MVP or mostly hidden?
5. Is the first monetization test sponsor-led, SaaS-led, or ticketed program-led?
6. Do we ship the Product Hunt wedge in MVP, V1, or as a parallel pilot?
7. How much of the reference implementation will be reused versus treated as inspiration only?

## Final Summary

The original PRD had the right instinct but needed a cleaner structure.

The revised BuildParty vision is:

* **community-first, not server-first**
* **program-aware, not just session-aware**
* **live and recurring, not just event-based**
* **partner-capable and BuildParty-capable**
* **accelerated by a realtime reference implementation but not defined by it**

The resulting roadmap is more coherent, more buildable, and more aligned with what BuildParty is actually becoming.

