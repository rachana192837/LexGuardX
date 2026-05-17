# LexGuard X - God-Tier UI Design System

## Global Aesthetics & Physics
- **Design Philosophy:** Hyper-modern, cinematic cybersecurity/fintech fusion. Every element must feel alive, responsive, and incredibly premium. Avoid flat, static designs.
- **Glassmorphism 2.0:** Multi-layered blurred backgrounds (backdrop-blur: 24px) combined with subtle noise textures to give physical depth. Borders are not solid; they use 1px linear gradients (rgba(255,255,255,0.2) to transparent) to emulate light hitting glass edges.
- **Interactive Lighting:** Hovering over cards must trigger a glowing "spotlight" or "neon bloom" effect, making the interface feel tactile and reactive to user presence.

## Dynamic Background & Gradients
- **Primary Canvas:** Deep cosmic void. A mesh gradient background combining very dark indigo (`#050B14`), midnight blue (`#0B132C`), and hints of deep plum (`#1A0B2E`).
- **Moving Elements:** The background should feature a slowly shifting aurora/ambient mesh glow (animated via CSS keyframes) that breathes continuously over time, giving the impression of a living AI engine at work.

## Typography (Kinetic)
- **Fonts:** `Outfit` for display/headers (hyper-modern, geometric) and `Inter` for dense legal text to ensure readability.
- **Text Animations:** Important risk scores and numbers should visually "count up" on load. Headlines should reveal with a subtle, fluid upward fade.

## Core Color Palette
- **Primary Accent:** Radiant Neon Cyan (`#00F0FF`).
- **Secondary Accent:** Electric Violet (`#8A2BE2`).
- **Risk Status Colors (Always Gradients):**
  - Critical/High: Animated pulsing Crimson-to-Magenta gradient (`linear-gradient(135deg, #FF0055, #FF0033)`).
  - Normal/Moderate: Fiery Amber gradient.
  - Safe/Low: Bioluminescent Green (`linear-gradient(135deg, #00FF87, #60EFFF)`).

## Micro-Animations & Interactivity
- **Button Hover States:** Primary buttons don't just change color; they scale up slightly (`scale: 1.05`) while casting a highly saturated, diffused glowing drop shadow matching their accent color. 
- **Clause Highlighting (The "Scanning Laser"):** Legal text highlights in the Document Viewer should not be static blocks of color. They must feature a slow, shimmering gradient sweep across the highlighted background to draw the eye.
- **Debate Panel Activity:** When the Prosecutor or Defense agents are active, their respective panel borders should pulse organically, resembling a pulsating intelligence core.
- **Physics Transitions:** All state changes (persona toggles, risk panel opening/closing) must use bounce/spring physics (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`) instead of linear fades.
