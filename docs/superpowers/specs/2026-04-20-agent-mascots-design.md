# BuildParty Agent Mascots — Design Spec
**Date:** 2026-04-20
**Scope:** 3D mascot character definitions + Higgsfield generation prompts for all five BuildParty agents

---

## Overview

Five 3D mascot characters for the BuildParty agent constellation (Nova, Echo, Orbit, Flare, Apex). Each mascot will replace the colored orb placeholder on the `/agents` screen and appear across live BuildParty and PreParty experiences.

The mascot system must feel cohesive as a set while giving each agent a distinct personality through form, color, and detail.

---

## Shared Style Baseline

All five mascots share the same visual language:

- **Form language:** Object-primary. Each mascot is a recognizable real-world or geometric form first, character second.
- **Material:** Smooth, weighty, sealed-pod quality — like a polished stone or premium toy. Not hard/crystalline, not soft/rubbery. Somewhere between: solid with a smooth gloss finish.
- **Eyes:** Medium expressiveness. Clearly defined iris with a small specular highlight dot. The face is visible and readable but never dominates the form. Eyes sit wherever they naturally fit the geometry — never forced.
- **Color rule:** All glows, highlights, internal details, and particle effects stay within each agent's own color palette — lighter or more saturated derivations of their hue. No generic white-gold or neutral tones.
- **Rendering target:** 3D rendered, physically-based materials, single key light + soft fill, clean neutral background. Premium product icon quality — think Apple spatial computing aesthetic meets high-end collectible toy.
- **Style references:** CleanMyMac 3D icons (glossy object quality, bold geometry, strong specular) + Lunogen mascot (character warmth, expressive eyes, premium toy softness).

---

## Agent Character Briefs & Higgsfield Prompts

---

### Nova — AI Host

**Role:** Room orchestration, master signal router, heartbeat of every session.
**Personality:** Commanding, illuminating, center of attention. Energizes every room.
**Color:** Amber/gold (`#f59e0b → #d97706`)

**Form:** Sun-disc — a thick, solid disc shape with subtle radiating ridges around the outer edge (corona detail). Inside the disc body, small floating particles are suspended in amber/gold tones, suggesting explosive contained intelligence. Eyes sit on the flat front face of the disc.

**Higgsfield Prompt:**
```
A 3D rendered mascot character. A thick, solid sun-disc shape — like a heavy glowing medallion. The outer edge has subtle radiating ridges suggesting a solar corona. Inside the disc body, tiny suspended particles float in warm amber and gold tones, implying explosive contained intelligence. The surface material is smooth and polished with a premium sealed-pod quality — not glass, not rubber, somewhere between a polished stone and a high-end toy. Two small expressive eyes with defined amber irises and white specular highlights sit on the flat front face. Strong amber-to-gold color palette throughout — all highlights, glows, and particle details stay within warm amber and gold tones. Single key light from upper left with soft fill. Clean neutral background. Apple spatial computing aesthetic meets premium collectible toy. Physically-based rendering, no cartoon outlines.
```

---

### Echo — Session Memory

**Role:** Context capture, perfect recall, the truth record of every session.
**Personality:** Precise, patient, holds everything. Invisible during sessions, present afterward.
**Color:** Teal/cyan (`#06b6d4 → #0891b2`)

**Form:** Nautilus shell cross-section — the logarithmic spiral viewed face-on, as if cut through the center of the shell to reveal the internal chambers. The spiral draws the eye inward toward a soft glowing light emanating from the innermost chamber, suggesting stored memories alive inside. Eyes sit on the large outer whorl of the shell, on the smooth face-forward surface.

**Higgsfield Prompt:**
```
A 3D rendered mascot character. A nautilus shell cross-section — the internal logarithmic spiral viewed face-on, chambers revealed, carved from a single smooth solid material. From the innermost spiral chamber, a soft luminous glow emanates in bright teal and cyan tones, as if memories stored deep inside are alive and radiant. The surface material is smooth with a premium sealed-pod quality — polished, weighty, solid. Two small expressive eyes with defined teal irises and white specular highlights sit on the large outer whorl of the shell, facing forward naturally. Teal and cyan color palette throughout — all glows and highlights stay within teal and cyan tones, brighter toward the spiral center, deeper toward the outer edge. Single key light from upper left with soft fill. Clean neutral background. Physically-based rendering, premium product icon quality, no cartoon outlines.
```

---

### Orbit — Build Buddy

**Role:** Live context-aware coding support. Always present, never intrusive.
**Personality:** Calm, reliable, perpetually helpful. Circles builders as they code.
**Color:** Violet (`#8b5cf6 → #7c3aed`)

**Form:** Gyroscope — two or three rings at perpendicular angles surrounding a solid central sphere. The sphere is Orbit's body, calm and grounded at the center. The rings suggest constant helpful activity orbiting around a stable core. No additional surface details — the geometry speaks for itself. Eyes sit on the central sphere, looking straight out.

**Higgsfield Prompt:**
```
A 3D rendered mascot character. A gyroscope — a solid smooth sphere at the center with two or three perpendicular orbital rings surrounding it at different angles, all carved from the same smooth solid material. The central sphere is calm and grounded. The rings suggest motion and orbit without being chaotic. No internal details or surface patterns — clean geometry only. The surface material is smooth with a premium sealed-pod quality — polished, weighty, solid. Two small expressive eyes with defined violet irises and white specular highlights sit on the central sphere, looking straight forward. Deep violet and purple color palette throughout — all highlights stay within violet tones. Single key light from upper left with soft fill. Clean neutral background. Physically-based rendering, premium collectible toy quality, no cartoon outlines.
```

---

### Flare — Media Agent

**Role:** Viral content creation and distribution. Takes session content and sends it into the world.
**Personality:** Fast, bright, far-reaching. Explosive energy that propagates outward.
**Color:** Rose/coral (`#f43f5e → #e11d48`)

**Form:** Flame-droplet — a teardrop/droplet solid form as the body, with flame detail sculpted at the top. At the very tip of the flame, small particles in rose/coral tones are escaping outward — like embers or sparks launching off into the world. Eyes sit on the smooth rounded lower body of the droplet.

**Higgsfield Prompt:**
```
A 3D rendered mascot character. A solid flame-droplet form — a smooth rounded teardrop body at the base transitioning into sculpted flame detail at the top. At the tip of the flame, tiny particles and sparks in bright rose and coral tones are escaping outward, like embers launching into the world. The body has a premium sealed-pod material quality — smooth, polished, solid weight, not wispy or translucent. Two small expressive eyes with defined rose-coral irises and white specular highlights sit on the smooth rounded lower body. Rose and coral color palette throughout — all highlights, flame details, and escaping particles stay within rose, coral, and warm red tones. Single key light from upper left with soft fill. Clean neutral background. Physically-based rendering, premium product icon quality, no cartoon outlines.
```

---

### Apex — Launch Agent

**Role:** Full-arc product launch director. The hero agent. D-30 to D+30.
**Personality:** Commanding, achievement-embodied, the highest point of every trajectory.
**Color:** Brand orange (`#ff7a2f → #c24e00`)

**Form:** Diamond octahedron — two pyramids joined at the base, the classic raw diamond form. The top vertex is the literal apex — the highest point. No additional surface details — the geometry and the brand orange color carry everything. Eyes sit on one of the upper facets facing forward.

**Higgsfield Prompt:**
```
A 3D rendered mascot character. A diamond octahedron — two pyramids joined symmetrically at the base, the classic raw diamond geometric form. The top vertex is sharp and commanding — the literal highest point. The facets are clean and precise, catching light differently at each angle. The surface material is smooth with a premium sealed-pod quality — polished, weighty, solid, not glass-like or crystalline but more like a sealed object with soft specular. Two small expressive eyes with defined deep orange irises and white specular highlights sit on one of the upper front-facing facets. Brand orange color palette throughout — all highlights and specular reflections stay within orange tones, from bright highlight orange to deep burnt orange in the shadows. Single key light from upper left with soft fill. Clean neutral background. Physically-based rendering, premium product icon quality, no cartoon outlines.
```

---

## Generation Notes

- Run each prompt as a **static 3D render** first (Higgsfield image mode)
- Once approved, animate with **Seedance** — subtle idle animation per agent (Nova: slow pulse of particles; Echo: faint spiral glow breathe; Orbit: rings slowly rotating; Flare: particles continuously emitting from tip; Apex: very slow rotation showing all facets)
- All five should be rendered with identical **lighting setup, background, and camera distance** so they read as a cohesive set when placed side by side on the `/agents` screen
- When renders are ready, swap the colored orb `<div>` in `AgentCard.tsx` for an `<img>` tag pointing to the render

---

## Style References

- `input/cleanmymac_3ds.png` — glossy object quality, bold geometry, strong specular
- `input/lunogen_mascot.png` — character warmth, expressive eyes, premium toy softness
