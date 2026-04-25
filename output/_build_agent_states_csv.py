"""Build the AgentStages sheet-ready CSV.
Columns: State | When/Why | Vibe/Feel | Nova | Echo | Orbit | Flare | Apex
Writes to: input/042226_agent-states-sheet.csv (UTF-8, Google-Sheets-pasteable)
"""

import csv
import sys
import io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

HEADERS = ["State", "When/Why", "Vibe/Feel", "Nova", "Echo", "Orbit", "Flare", "Apex"]

# Shared states — each row has per-agent one-liners
SHARED_ROWS = [
    {
        "State": "Resting",
        "When/Why": "Default idle state. No active session. Agent is not called upon. The current base concept images ARE this state.",
        "Vibe/Feel": "Asleep, peaceful, quietly present.",
        "Nova": "Violet sphere, soul at rest, purple+white particles drifting evenly, soft ambient inner glow.",
        "Echo": "Mint arch, arch-soul at rest, sparse mint particles drifting, soft ambient inner glow.",
        "Orbit": "Cobalt squircle, spherical soul at rest, blue particles orbiting slowly, soft ambient inner glow.",
        "Flare": "Coral faceted teardrop, teardrop soul at rest, coral bubble particles rising slowly, soft ambient inner glow.",
        "Apex": "Amber icosahedron, sphere soul at rest with faint cheek blush, amber+gold particles drifting, soft ambient inner glow.",
    },
    {
        "State": "Waking",
        "When/Why": "A session is about to start or the agent is being invoked. Transitional moment — seconds long.",
        "Vibe/Feel": "Stirring, coming online, first breath.",
        "Nova": "Eyes mid-open, purple aura blooms outward from soul once, particles organizing.",
        "Echo": "Eyes mid-open, mint aura blooms once, mint particles settling into an organized drift.",
        "Orbit": "Eyes mid-open, blue aura blooms once, particles beginning their orbit.",
        "Flare": "Eyes mid-open, coral aura blooms once, bubble particles starting to rise.",
        "Apex": "Eyes mid-open, amber aura blooms once, trajectory particles beginning to form.",
    },
    {
        "State": "Listening",
        "When/Why": "Someone is speaking, asking a question, or the agent is observing activity in the room.",
        "Vibe/Feel": "Attentive, receptive, leaning in.",
        "Nova": "Eyes soft & turned toward source, purple aura asymmetric (brighter on source side), particles drift toward sound, soul leans 5°.",
        "Echo": "Arch-soul tilts toward source, mint aura asymmetric, particles drift toward the sound, ready to capture.",
        "Orbit": "Spherical soul tilts toward builder, cobalt aura asymmetric, particles lean in the heard direction.",
        "Flare": "Teardrop soul leans toward source, coral aura asymmetric, bubble particles drift toward the sound.",
        "Apex": "Soul leans toward signal, amber aura asymmetric, trajectory particles tilt toward source.",
    },
    {
        "State": "Thinking",
        "When/Why": "Agent is reasoning — clustering Q&A, searching memory, matching context, drafting content, analyzing a launch.",
        "Vibe/Feel": "Processing, introspective, concentrating.",
        "Nova": "Eyes closed or up, purple aura contracts inward in concentric rings, particles spiral into soul, faint shell translucency hint.",
        "Echo": "Eyes closed in recall, mint aura contracts inward, particles spiral into arch-soul, faint translucency.",
        "Orbit": "Eyes softly focused, cobalt aura contracts inward, particles spiral into the sphere-soul, faint translucency.",
        "Flare": "Eyes looking up in consideration, coral aura contracts inward, bubble particles spiral inward, faint translucency.",
        "Apex": "Eyes concentrated, amber aura contracts inward, trajectory particles spiral into soul, faint translucency.",
    },
    {
        "State": "Speaking",
        "When/Why": "Agent is producing output — announcing, welcoming, publishing, responding. Key active state.",
        "Vibe/Feel": "Active, warm, broadcasting, lantern-from-within.",
        "Nova": "Small 'o' mouth, purple aura pulses outward in concentric waves hitting inner shell, shell glows rhythmically brighter.",
        "Echo": "Small 'o' mouth, mint aura pulses outward, arch-soul pulses with voice cadence, shell glows brighter in rhythm.",
        "Orbit": "Small 'o' mouth, cobalt aura pulses outward, sphere-soul pulses rhythmically, shell glows with each beat.",
        "Flare": "Small 'o' mouth, coral aura pulses outward strongly (Flare's signature broadcasting motif carried over to speaking), shell glows rhythmically.",
        "Apex": "Small 'o' mouth, amber aura pulses outward, sphere-soul pulses, shell glows rhythmically brighter.",
    },
    {
        "State": "Delighted",
        "When/Why": "A moment of delight — great question from a builder, a hunter says yes, a demo lands, a breakthrough insight.",
        "Vibe/Feel": "Joyful, sparking, buoyant.",
        "Nova": "Crinkle-smile eyes, smile mouth, warmer cheek blush, purple aura sparkles with gold-white flickers, particles brighten & multiply.",
        "Echo": "Crinkle-smile eyes, smile mouth, mint aura warmer with gold flickers, particles brighter & sparkling.",
        "Orbit": "Crinkle-smile eyes, smile mouth, cobalt aura with warm gold flickers, particles brighter & multiplied.",
        "Flare": "Crinkle-smile eyes, smile mouth (widest of all agents here — Flare loves joy), coral aura sparkles with gold, bubble particles multiply.",
        "Apex": "Crinkle-smile eyes, warm smile, amber aura sparkles with extra gold warmth, particles brighten & multiply.",
    },
    {
        "State": "Mind-Blown",
        "When/Why": "Rare awe-struck moment — Sam Altman says something game-changing, PH rank hits #1, impossible bug solved. Very sparing use.",
        "Vibe/Feel": "Rare, awestruck, transcendent — the only state that cracks open the shell.",
        "Nova": "Wide eyes, small round 'o' mouth, purple aura bursts outward, shell FULLY TRANSLUCENT revealing neural dendrite network inside.",
        "Echo": "Wide eyes, round 'o' mouth, mint aura bursts outward, shell translucent revealing stacked echo rings / memory layers.",
        "Orbit": "Wide eyes, round 'o' mouth, cobalt aura bursts outward, shell translucent revealing orbital arcs and concentric spheres.",
        "Flare": "Wide eyes, round 'o' mouth, coral aura bursts outward, shell translucent revealing prismatic crystal facets and aurora bloom.",
        "Apex": "Wide eyes, round 'o' mouth, amber aura bursts outward, shell translucent revealing rising trajectory lattice.",
    },
    {
        "State": "Confused",
        "When/Why": "Something went off-script — off-topic question, error thrown, unclear input. Brief and recoverable.",
        "Vibe/Feel": "Uncertain, off-kilter, recoverable.",
        "Nova": "One eye larger (off-kilter), squiggle mouth, sweat bead on one cheek, purple aura flickers unevenly, particles clump to one side, soul tilts 10°.",
        "Echo": "Off-kilter eyes, squiggle mouth, mint aura flickers unevenly, particles clump asymmetrically, arch-soul tilts.",
        "Orbit": "Off-kilter eyes, squiggle mouth, cobalt aura flickers, particles freeze mid-orbit and clump to one side, soul tilts.",
        "Flare": "Off-kilter eyes, squiggle mouth, coral aura flickers unevenly, bubble particles freeze & clump, soul tilts.",
        "Apex": "Off-kilter eyes, squiggle mouth, amber aura flickers, trajectory particles scatter and clump, soul tilts.",
    },
]

# Agent-unique states — only the one agent's column is filled; others are "—"
UNIQUE_ROWS = [
    {
        "State": "Welcoming",
        "When/Why": "A new attendee joins a session. Nova greets them by name and introduces them to the room. Happens many times per session.",
        "Vibe/Feel": "Hospitable, open, hand-extended.",
        "agent": "Nova",
        "cell": "Soft eyes forward, gentle smile, warmer cheek blush. Soul leans 5° forward (bow). Purple aura has warm forward-facing bloom. Particles drift outward toward viewer.",
    },
    {
        "State": "Orchestrating",
        "When/Why": "Nova is managing session flow — hitting transitions, nudging host on timing, introducing a presenter.",
        "Vibe/Feel": "Conducting, tempo-keeping.",
        "agent": "Nova",
        "cell": "Alert eyes scan side-to-side, lightly pressed lips. Purple aura has a gentle clockwise rotational sweep. Particles circulate clockwise around the soul.",
    },
    {
        "State": "Moderating",
        "When/Why": "Nova is flagging off-topic content, resolving disputes, pausing disruption.",
        "Vibe/Feel": "Calm authority, firm, composed.",
        "agent": "Nova",
        "cell": "Steady direct eyes, calm firm line for mouth. Purple aura shifts cooler/deeper (toward blue-purple). Particles hold stable symmetric formation.",
    },
    {
        "State": "Capturing",
        "When/Why": "Actively tagging/recording a moment — Nova flagged a great question, a code snippet was shared, a key quote landed.",
        "Vibe/Feel": "Active preservation, noting.",
        "agent": "Echo",
        "cell": "Gently focused eyes, slightly parted mouth. Particles freeze then get pulled into soul. Mint aura has single inward pulse with amber tint threaded through.",
    },
    {
        "State": "Recalling",
        "When/Why": "Surfacing a memory — someone asks 'what did we decide last week?' Echo searches its archive.",
        "Vibe/Feel": "Inward gaze, memory retrieval.",
        "agent": "Echo",
        "cell": "Eyes closed or inward, slightly parted mouth. Particles cascade outward from soul in a timeline trail like an unfurling scroll. Mint aura streams directionally outward.",
    },
    {
        "State": "Recapping",
        "When/Why": "Generating the post-session recap — extended synthesis, weaving threads together.",
        "Vibe/Feel": "Thoughtful synthesis, weaving.",
        "agent": "Echo",
        "cell": "Thoughtful eyes, knowing smile. Particles form a gentle weaving braid pattern. Mint aura has layered interleaving ribbons of light.",
    },
    {
        "State": "Assisting",
        "When/Why": "Actively helping a builder — offering a code suggestion, answering a question in CoBuild. Orbit's default working mode.",
        "Vibe/Feel": "Focused, nearby, dialed-in.",
        "agent": "Orbit",
        "cell": "Eyes focused forward and slightly down (watching code). Particles form tight orbital ring close around soul. Cobalt aura concentrates near soul, ring glows brighter.",
    },
    {
        "State": "Matching",
        "When/Why": "Connecting two builders with complementary skills. Unique to Orbit's matching role.",
        "Vibe/Feel": "Connective, binary-star.",
        "agent": "Orbit",
        "cell": "Soft eyes between two points, subtle warm smile. Particles split into two paired clusters orbiting each other like a binary star. Aura has two bright focal points with connecting glow.",
    },
    {
        "State": "Debugging",
        "When/Why": "Helping triage an error — serious, focused, diagnostic.",
        "Vibe/Feel": "Sharp, diagnostic, fast loops.",
        "agent": "Orbit",
        "cell": "Narrowed sharp eyes, pressed mouth. Particles move in fast tight diagnostic loops. Cobalt aura is sharp and directed, soul slightly narrower and more saturated.",
    },
    {
        "State": "Composing",
        "When/Why": "Drafting a post, quote card, or highlight reel — a creative generative state.",
        "Vibe/Feel": "Creative iteration.",
        "agent": "Flare",
        "cell": "Creative eyes looking up, softly parted mouth. Particles cluster and recombine into geometric shapes (cards, text blocks) then dissolve. Coral aura has generative swirling patterns.",
    },
    {
        "State": "Broadcasting",
        "When/Why": "Publishing content live to LinkedIn / X / etc. Flare's signature moment.",
        "Vibe/Feel": "Outward send, amplification.",
        "agent": "Flare",
        "cell": "Confident forward eyes, subtle confident smile. Particles stream outward in directed beams from soul to shell. Coral aura forms coordinated outward 'send' beams.",
    },
    {
        "State": "Kudos",
        "When/Why": "Tagging a specific participant in a post (the 'Glenn Kohner' personalized callout moment).",
        "Vibe/Feel": "Spotlighting warmth.",
        "agent": "Flare",
        "cell": "Soft warm eyes, genuine smile, warmer cheek blush. One particle visibly lifts out from cluster, glowing brightly (spotlight). Coral aura gentle with single bright focal point.",
    },
    {
        "State": "Running",
        "When/Why": "Apex is actively executing launch tasks — scanning PH, enriching profiles, drafting outreach. Matches screen 1.0 in the demo.",
        "Vibe/Feel": "Engines firing, controlled propulsion.",
        "agent": "Apex",
        "cell": "Focused forward eyes (slightly narrowed), purposeful neutral mouth. Particles stream upward in organized trajectory lines like vapor trails. Amber aura has sustained upward-flowing propulsion pattern (not pulsing).",
    },
    {
        "State": "Tracking",
        "When/Why": "Real-time monitoring during launch day — watching PH rank, upvotes, traffic.",
        "Vibe/Feel": "Alert watch, telemetry.",
        "agent": "Apex",
        "cell": "Alert eyes watching upward, neutral mouth. Particles form upward-climbing trajectory arcs like telemetry readout. Amber aura shows glowing upward-trending lines inside shell.",
    },
    {
        "State": "Alerting",
        "When/Why": "Anomaly detected — rank dropping, something needs attention. Heightened alert, not yet panic.",
        "Vibe/Feel": "Urgent watch, warning pulse.",
        "agent": "Apex",
        "cell": "Wider alert eyes, slightly pressed mouth. Particles flash brighter, cluster briefly, then resume. Amber aura has subtle asymmetric urgent warning pulses.",
    },
    {
        "State": "Victorious",
        "When/Why": "Launch hits a milestone — Top 10, Top 5, Product of the Day. Apex's peak emotional payoff.",
        "Vibe/Feel": "Peak celebration, rocket-plume joy.",
        "agent": "Apex",
        "cell": "Crinkle-smile eyes at peak joy, full genuine smile, deeper cheek blush. Particles burst upward in rocket-plume pattern. Amber aura at peak brightness with warm gold undertones and upward plumes.",
    },
]


def row_for_shared(s):
    return [
        s["State"], s["When/Why"], s["Vibe/Feel"],
        s["Nova"], s["Echo"], s["Orbit"], s["Flare"], s["Apex"],
    ]


def row_for_unique(u):
    cells = {"Nova": "—", "Echo": "—", "Orbit": "—", "Flare": "—", "Apex": "—"}
    cells[u["agent"]] = u["cell"]
    return [
        u["State"], u["When/Why"], u["Vibe/Feel"],
        cells["Nova"], cells["Echo"], cells["Orbit"], cells["Flare"], cells["Apex"],
    ]


out_path = Path(__file__).parent / "042226_agent-states-sheet.csv"
with open(out_path, "w", encoding="utf-8-sig", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(HEADERS)
    for row in SHARED_ROWS:
        writer.writerow(row_for_shared(row))
    for row in UNIQUE_ROWS:
        writer.writerow(row_for_unique(row))

total_rows = len(SHARED_ROWS) + len(UNIQUE_ROWS)
print(f"Wrote {out_path}")
print(f"Rows: {total_rows} ({len(SHARED_ROWS)} shared + {len(UNIQUE_ROWS)} unique)")
