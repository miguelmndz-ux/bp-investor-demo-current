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
- **Eyes & smile:** Medium expressiveness. Clearly defined iris with a small specular highlight dot and a soft smile. The face is visible and readable but never dominates the form. Eyes and smile sit wherever they naturally fit the geometry — never forced. Style reference: Lunogen mascot image (attached in Higgsfield).
- **Color rule:** All glows, highlights, internal details, and particle effects stay within each agent's own color palette — lighter or more saturated derivations of their hue. No generic white-gold or neutral tones.
- **Material:** Glossy with a slight transparency. Polished and heavy, not glassy. Soft specular highlights. Reference: CleanMyMac 3D image (attached in Higgsfield).
- **Rounded corners:** All forms have softly rounded edges — vertices, ridges, and facet edges are chamfered for a premium sealed-pod feel. No sharp geometric cuts except where the form concept requires it (e.g. Apex's top vertex).
- **Rendering target:** 3D rendered, physically-based materials, single key light from upper left + soft fill, clean neutral background. Premium product icon quality. No cartoon outlines.
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
A 3D mascot. It's a thick, solid sun-disc — like a heavy glowing medallion with subtle radiating ridges around the outer edge suggesting a solar corona. The rim and ridges have softly rounded edges throughout. Inside the disc body, tiny floating particles are suspended in warm amber and gold tones, implying explosive contained intelligence. The material should feel like a premium sealed pod: polished and heavy, not glassy, with soft highlights and just a bit of transparency. Place two expressive eyes with defined amber irises and white highlights on the flat front face, with a soft smile. Use our amber/gold palette, keeping all highlights, glows, and particle details in warm amber and gold tones. Use a single key light from the upper left and a soft fill. Set it against a clean, neutral background. Go for physically-based rendering for a premium product icon look, with no outlines. Match the texture and material to the attached "cleanmymac" image. Make the eyes and smile look like the "lunogen_mascot" image.
```

---

### Echo — Session Memory

**Role:** Context capture, perfect recall, the truth record of every session.
**Personality:** Precise, patient, holds everything. Invisible during sessions, present afterward.
**Color:** Teal/cyan (`#06b6d4 → #0891b2`)

**Form:** Nautilus shell cross-section — the logarithmic spiral viewed face-on, as if cut through the center of the shell to reveal the internal chambers. The spiral draws the eye inward toward a soft glowing light emanating from the innermost chamber, suggesting stored memories alive inside. Eyes sit on the large outer whorl of the shell, on the smooth face-forward surface.

**Higgsfield Prompt:**
```
A 3D mascot. It's a nautilus shell cross-section — the internal logarithmic spiral viewed face-on, chambers revealed, as if the shell were cut through its center to expose the layers inside. The outer body and edges are softly rounded. From the innermost spiral chamber, a soft luminous glow emanates in bright teal and cyan tones, as if memories stored deep inside are alive and radiant. The material should feel like a premium sealed pod: polished and heavy, not glassy, with soft highlights and just a bit of transparency. Place two expressive eyes with defined teal irises and white highlights on the large outer whorl facing forward naturally, with a soft smile. Use our teal/cyan palette, keeping all glows and highlights in teal and cyan tones — brighter toward the spiral center, deeper toward the outer edge. Use a single key light from the upper left and a soft fill. Set it against a clean, neutral background. Go for physically-based rendering for a premium product icon look, with no outlines. Match the texture and material to the attached "cleanmymac" image. Make the eyes and smile look like the "lunogen_mascot" image.
```

---

### Orbit — Build Buddy

**Role:** Live context-aware coding support. Always present, never intrusive.
**Personality:** Calm, reliable, perpetually helpful. Circles builders as they code.
**Color:** Violet (`#8b5cf6 → #7c3aed`)

**Form:** Gyroscope — two or three rings at perpendicular angles surrounding a solid central sphere. The sphere is Orbit's body, calm and grounded at the center. The rings suggest constant helpful activity orbiting around a stable core. No additional surface details — the geometry speaks for itself. Eyes sit on the central sphere, looking straight out.

**Higgsfield Prompt:**
```
A 3D mascot. It's a gyroscope — a solid smooth sphere at the center with two or three perpendicular orbital rings surrounding it at different angles. The rings have a rounded tubular cross-section, not flat edges. The central sphere is calm and grounded. No surface details or patterns — clean geometry only. The material should feel like a premium sealed pod: polished and heavy, not glassy, with soft highlights and just a bit of transparency. Place two expressive eyes with defined violet irises and white highlights on the central sphere looking straight forward, with a soft smile. Use our violet palette, keeping all highlights within violet and purple tones. Use a single key light from the upper left and a soft fill. Set it against a clean, neutral background. Go for physically-based rendering for a premium product icon look, with no outlines. Match the texture and material to the attached "cleanmymac" image. Make the eyes and smile look like the "lunogen_mascot" image.
```

---

### Flare — Media Agent

**Role:** Viral content creation and distribution. Takes session content and sends it into the world.
**Personality:** Fast, bright, far-reaching. Explosive energy that propagates outward.
**Color:** Rose/coral (`#f43f5e → #e11d48`)

**Form:** Flame-droplet — a teardrop/droplet solid form as the body, with flame detail sculpted at the top. At the very tip of the flame, small particles in rose/coral tones are escaping outward — like embers or sparks launching off into the world. Eyes sit on the smooth rounded lower body of the droplet.

**Higgsfield Prompt:**
```
A 3D mascot. It's a flame-droplet — a smooth rounded teardrop body at the base transitioning into sculpted flame detail at the top, with softly rounded edges throughout. At the very tip of the flame, tiny particles and sparks in bright rose and coral tones escape outward, like embers launching into the world. The material should feel like a premium sealed pod: polished and heavy, not wispy or translucent, with soft highlights and just a bit of transparency. Place two expressive eyes with defined rose-coral irises and white highlights on the smooth rounded lower body, with a soft smile. Use our rose/coral palette, keeping all highlights, flame details, and escaping particles in rose, coral, and warm red tones. Use a single key light from the upper left and a soft fill. Set it against a clean, neutral background. Go for physically-based rendering for a premium product icon look, with no outlines. Match the texture and material to the attached "cleanmymac" image. Make the eyes and smile look like the "lunogen_mascot" image.
```

---

### Apex — Launch Agent

**Role:** Full-arc product launch director. The hero agent. D-30 to D+30.
**Personality:** Commanding, achievement-embodied, the highest point of every trajectory.
**Color:** Brand orange (`#ff7a2f → #c24e00`)

**Form:** Diamond octahedron — two pyramids joined at the base, the classic raw diamond form. The top vertex is the literal apex — the highest point. No additional surface details — the geometry and the brand orange color carry everything. Eyes sit on one of the upper facets facing forward.

**Higgsfield Prompt:**
```
A 3D mascot. It's a diamond octahedron, basically two pyramids joined at the base like a classic raw diamond form. The top vertex is the highest point. The facet edges are slightly softened and rounded for a premium sealed-pod feel — clean and precise, catching light differently from every angle. The material should feel like a premium sealed pod: polished and heavy, not glassy, with soft highlights and just a bit of transparency. Place two expressive eyes with deep orange irises and white highlights on an upper facet, with a soft smile. Use our brand orange palette, keeping all reflections in orange tones, from bright to burnt orange shadows. Use a single key light from the upper left and a soft fill. Set it against a clean, neutral background. Go for physically-based rendering for a premium product icon look, with no outlines. Match the texture and material to the attached "cleanmymac" image. Make the eyes and smile look like the "lunogen_mascot" image.
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
