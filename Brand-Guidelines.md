# Brand Guidelines
## Mevakkatu Shree Nagaraja Kshetram Website

> This document is the single source of truth for the design, branding, and frontend implementation of the temple website. Every design and development decision should align with these guidelines.

---

# Project Overview

## Project Name

Mevakkatu Shree Nagaraja Kshetram Website

## Project Goal

Create a calm, immersive, mobile-first temple website that reflects the spiritual atmosphere of a traditional Kerala temple while maintaining a clean, modern user experience.

The website should never feel commercial or flashy. Every page should evoke peace, silence, and reverence.

---

# Brand Identity

## Temple Name

Mevakkatu Shree Nagaraja Kshetram

## Brand Personality

- Traditional
- Minimal
- Dark
- Calm
- Sacred
- Authentic

## Brand Characteristics

- Dark
- Minimal
- Moody

---

# Target Audience

Primary audience:

- Daily devotees
- Elderly visitors

The interface should prioritize clarity, readability, and simplicity over complexity.

---

# Design Philosophy

The entire experience should feel like walking through a peaceful Kerala temple surrounded by sacred trees.

Every section should breathe.

Whitespace is a design element.

Avoid unnecessary decoration.

The design should communicate silence rather than excitement.

---

# Overall Design Style

## Theme

Dark

## Style

Traditional Minimalism

## Visual Characteristics

- Rounded corners
- Soft shadows
- Large whitespace
- Calm typography
- Cinematic imagery
- Earthy colors
- Organic layouts

## Desired Feel

- Peaceful
- Sacred
- Quiet
- Timeless
- Elegant
- Natural

## Avoid

- Luxury styling
- Loud colors
- Overly modern UI
- Heavy gradients
- Busy layouts

---

# Color System

## Primary

`#C6A15B`

## Secondary

`#23452F`

## Accent

`#8FA98B`

## Success

`#4F8A5B`

## Warning

`#D88A2D`

## Background

`#0F1B16`

## Surface

`#18261F`

## Border

`#2A3A33`

## Text Primary

`#F3EFE3`

## Text Secondary

`#C4C0B4`

## Muted

`#6D7B71`

## Hover

`#D6B46E`

---

# Typography

## Font Stack

### Display Font

Forum

Use for:

- Hero Title
- Festival Titles
- Quotes
- Sacred Callouts

### Heading Font

Gloock

Use for:

- H1
- H2
- H3
- Section headings
- Temple name

### Body Font

Manrope

Use for:

- Paragraphs
- Navigation
- Cards
- Forms
- Buttons

---

# Typography Scale

| Element | Desktop | Mobile |
|----------|---------:|--------:|
| Hero | 72px | 44px |
| H1 | 56px | 36px |
| H2 | 42px | 30px |
| H3 | 32px | 24px |
| H4 | 24px | 20px |
| Body Large | 20px | 18px |
| Body | 18px | 16px |
| Small | 15px | 14px |
| Caption | 13px | 12px |

---

# Font Weights

## Forum

400

## Gloock

400

## Manrope

400 — Body

500 — Navigation

600 — Buttons

700 — Important Labels

---

# Letter Spacing

Hero → 0.08em

H1 → 0.04em

H2 → 0.03em

H3 → 0.02em

Body → 0.01em

Buttons → 0.06em

---

# Line Heights

Hero → 1.1

H1 → 1.15

H2 → 1.2

H3 → 1.3

Body → 1.75

Small → 1.6

---

# Text Color Hierarchy

Hero

`#F3EFE3`

Headings

`#F3EFE3`

Accent Text

`#C6A15B`

Body

`#C4C0B4`

Secondary

`#8FA98B`

Muted

`#6D7B71`

---

# Icons

Use Lucide React icons only.

Style:

- Outline
- Thin stroke
- Rounded
- Organic
- Minimal
- Monochrome

Avoid filled icons.

---

# Photography

Use real temple photography.

Preferred style:

- Cinematic
- Natural
- Dark
- Desaturated
- Soft lighting

Never use generic stock photos.

---

# Layout System

## Layout Philosophy

Design mobile first.

Desktop is an enhancement.

---

## Maximum Width

Desktop

1200px

Tablet

720px

Mobile

100%

---

## Grid

### Mobile

1 Column

### Tablet

2 Columns

### Desktop

12 Columns

---

## Container Padding

Mobile

20px

Tablet

32px

Desktop

48px

---

## Spacing Scale

XS → 4px

SM → 8px

MD → 16px

LG → 24px

XL → 32px

2XL → 48px

3XL → 64px

4XL → 96px

Always use this spacing scale.

---

## Section Padding

Mobile

72px

Tablet

88px

Desktop

120px

---

## Card Design

Padding

24px

Gap

20px

Radius

20px

Border

1px solid #2A3A33

Background

#18261F

---

## Content Width

Hero

640px

Paragraph

680px

History

720px

---

## Image Guidelines

- Rounded corners (24px)
- Soft shadows
- Full width on mobile
- Aspect ratio 16:9 or 4:5

---

# Navigation

Navbar should be:

- Sticky
- Solid background
- Responsive
- Minimal

Desktop and mobile navigation should share the same visual language.

---

# Components

Create reusable components for:

- Navbar
- Footer
- Buttons
- Cards
- Forms
- Labels
- Tabs
- Timeline
- Gallery
- Event Cards
- Donation Cards

Never duplicate component logic.

---

# Buttons

Create three button variants.

## Primary

Filled

## Secondary

Outlined

## Ghost

Transparent

Hover animations should be subtle.

---

# Forms

Use consistent styling for:

- Input
- Textarea
- Dropdown
- Checkbox
- Radio

Ensure proper focus states.

---

# Shadows

Use only soft shadows.

Cards should feel slightly elevated.

Avoid harsh shadows.

---

# Animation Guidelines

Animations should never distract.

Allowed animations:

- Fade
- Scale
- Slide
- Blur

Animation style:

- Slow
- Soft
- Natural

Avoid dramatic motion.

Support reduced motion preferences.

---

# Accessibility

Must support:

- WCAG color contrast
- Keyboard navigation
- Focus indicators
- Alt text
- ARIA labels
- Reduced motion

---

# Responsive Design

## Mobile

<640px

## Tablet

640px–1023px

## Desktop

≥1024px

Design mobile first.

---

# Website Structure

1. Hero

2. Temple Introduction

3. Temple History

4. Sacred Grove

5. Daily Rituals

6. Festivals

7. Gallery

8. Visitor Information

9. Donation

10. Footer

---

# Pages

- Home
- About
- Temple History
- Gallery
- Events
- Poojas
- Donations
- Contact
- FAQs
- Admin

---

# Technical Stack

Framework

Next.js

Language

JavaScript

Styling

Tailwind CSS

Animations

Framer Motion

Icons

Lucide React

Fonts

Google Fonts

Images

Next.js Image Component

Deployment

Render

---

# Folder Structure

```
app/
components/
layouts/
hooks/
utils/
assets/
fonts/
```

---

# Coding Standards

Always follow these rules.

- Component-first architecture
- Mobile-first development
- Reusable components
- Semantic HTML
- Accessible components
- No inline styles
- Clean folder structure
- Lazy loading
- Performance optimized
- Strict JavaScript
- Clean React patterns

---

# Performance Goals

- Lazy load images
- Responsive images
- Minimize layout shifts
- Optimize Core Web Vitals
- Maintain accessibility

---

# Content Tone

Content should always be:

- Formal
- Short
- Calm
- Respectful
- Minimal

Avoid marketing language.

---

# Inspiration

Reference:

https://mannarasala.org/

Draw inspiration from the atmosphere and serenity, not the layout or implementation.

---

# Brand Keywords

- Peaceful
- Sacred
- Timeless
- Minimal
- Divine
- Welcoming
- Traditional
- Graceful
- Calm
- Sacred Ecology
- Kerala Temple
- Nature Meets Divinity
- Earthy
- Ancient

---

# AI Implementation Principles

These principles override all other design decisions.

1. Mobile-first always.

2. Prioritize readability over decoration.

3. Maintain consistent spacing using the 8-point spacing system.

4. Reuse existing components instead of creating new visual styles.

5. Every section should feel spacious and calm.

6. Favor subtle animations over flashy effects.

7. Prefer typography and spacing over decorative elements.

8. Preserve visual consistency throughout the website.

9. Every interaction should feel smooth, quiet, and intentional.

10. If a design decision is ambiguous, choose the simpler and more minimal solution.

11. Keep the experience timeless rather than trendy.

12. The website should feel like entering a sacred Kerala temple—not a modern commercial landing page.