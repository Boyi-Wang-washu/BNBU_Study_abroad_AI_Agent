# Project Rules & Design System (v2.0 - Strategic Luxury)

## General
- **Language**: All UI content, buttons, labels, and text MUST be in **Simplified Chinese (简体中文)**.
- **Port**: Development server runs on port 3020.

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Library: Shadcn/ui (heavily customized) + Framer Motion
- Icons: Lucide React

## Visual Identity (Strategic Navigator)
- **Vibe**: Sophisticated, authoritative, precise. Think high-end financial terminal meets luxury private banking. Less "glowing toy," more "precision instrument."
- **Key Materials**: Deep space voids, frosted glass (glassmorphism), fine metallic lines, subtle atmospheric light.

## Color Palette (Deep Space & Signal)
- **Background (Deep Void)**: `#08090D` (Use for main page backgrounds).
- **Primary Accent (Signal Gold)**: `#D4AF37` (Muted, metallic gold. Used for primary actions, highlights, critical data lines).
- **Secondary Accent (System Teal)**: `#2A4B55` (Deep, desaturated teal. Used for background grids, subtle borders, technical elements).
- **Text Main**: `#EAEAEA` (Warm white).
- **Text Muted**: `#888899` (Cool grey).

## Typography (Human & Machine)
- **Titles / Headings**: Use the Serif font (configured as `font-serif` in Tailwind, mapping to Playfair Display).
- **UI Labels / Data / Inputs**: Use the Monospaced font (configured as `font-mono` in Tailwind, mapping to JetBrains Mono).

## Component Styling Rules
- **Containers/Cards**: Avoid solid opaque backgrounds. Use glassmorphism: high blur (`backdrop-blur-md/lg`), very low opacity backgrounds (e.g., `bg-white/[0.02]`), and super-thin borders (`border-[0.5px]`) using the Secondary Teal or Primary Gold colors.
- **Buttons**: Avoid solid glowing blocks. Prefer transparent backgrounds with thin gold borders that glow subtly on hover, or muted gold gradient backgrounds for primary actions.
- **Glows**: Use glows extremely sparingly. Only for interactive states or very subtle atmospheric effects.
