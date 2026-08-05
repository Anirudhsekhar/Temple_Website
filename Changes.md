# changes.md

## Project Update Instructions

This document contains the complete list of changes that must be implemented in the temple website. These changes are final and should be treated as implementation requirements.

---

# 1. Complete Theme Redesign

## Theme Name

**The Sacred Grove**

Alternative inspiration: **Whispers Beneath the Elanji Tree**

### Core Emotion

The website should recreate the feeling of entering a **Sarpakavu (Sacred Grove)** in Kerala.

When a visitor enters the website, they should feel:

> “I’m stepping into an ancient grove where nature itself is the deity.”

The experience should be:

- Old
- Mysterious
- Sacred
- Silent
- Humid
- Earthy
- Alive

Avoid:

- Bright modern temple aesthetics
- Luxurious gold-heavy styling
- Corporate design
- Horror or spooky elements

### Emotional Palette

The website must communicate these emotions simultaneously:

- 🌿 Serenity
- 🌑 Mystery
- 🐍 Sacredness
- 🍃 Living Nature

The visual atmosphere should evoke:

- Damp soil after rain
- Cool forest air
- Slowly moving leaves
- Elanji flower fragrance
- Filtered sunlight
- Quiet natural ambience

---

## Color Palette

| Purpose | Color | Hex |
|--------|-------|------|
| Background | Deep Forest | #0D1A12 |
| Cards | Moss | #233728 |
| Secondary Background | Wet Bark | #3A2D25 |
| Borders / Dividers | Ancient Stone | #5E645A |
| Highlight Text | Elanji Flower | #F7F2E7 |
| Normal Text | Mist | #D8D5C8 |
| Buttons / Icons | Sacred Bronze | #9B7A41 |
| Hover Accents | Fresh Leaf | #4F7A4D |

Darkness should be the dominant visual element. Green should exist within the darkness rather than overpower it.

---

## Background Design

Do not use a flat color background.

The website background should contain extremely subtle:

- Large tree silhouettes
- Creepers
- Vines
- Overlapping leaves
- Mist
- Soft shadows

These elements should be visible only after careful observation.

---

## Hero Section

The hero section should feel like entering the grove.

Requirements:

- Elanji tree canopy filling the upper section
- Branches spreading naturally across the screen
- Soft filtered sunlight
- Mist drifting through the scene
- Nagakavu beneath the canopy
- Heading emerging from the mist rather than sitting on a plain background

---

## Typography

### Headings

Elegant serif typography inspired by traditional Kerala temple inscriptions.

### Body Text

Quiet, highly readable sans-serif.

Avoid flashy or overly bold fonts.

---

## Textures

Use subtle natural textures inspired by:

- Stone
- Moss
- Weathered granite
- Aged wood

Avoid glossy modern surfaces.

---

## Animations

Animations should be almost imperceptible.

Examples:

- Leaves gently swaying
- Mist drifting slowly
- Tiny floating particles
- Soft shifting sunlight

Nothing should move quickly.

---

## Cards

Cards should resemble:

- Smooth river stones
- Worn dark wood
- Weathered stone surfaces

Use:

- Rounded corners
- Thin bronze borders
- Soft shadows

---

## Icons

Use line-art icons inspired by Kerala temple carvings.

Examples:

- Serpent
- Elanji flower
- Sacred grove
- Leaf

Avoid colorful filled icons.

---

## Images

All photographs should maintain a consistent atmosphere:

- After-rain mood
- Dense shade
- Soft contrast
- Warm highlights
- Low saturation

---

## Overall Design Language

The website should feel as though it has quietly existed for years beneath the Elanji tree, with every section emerging naturally from bark, stone, moss, and filtered light.

This is a **complete redesign**, not merely a color update.

---

# 2. Logo

Create a new logo based on a **serpent (Naga)**.

### Placement

- Navbar
- Hero section
- Footer

In the navbar, display the logo **alongside the temple name**.

---

# 3. New Tagline

The tagline has not been finalized.

Antigravity should generate **5–10 traditional / spiritual tagline options** that fit the Sacred Grove theme.

---

# Homepage Changes

## 4. Merge History into About

Remove the separate History section.

The **About section** should contain multiple subsections:

- Temple Introduction
- History
- Mission / Spiritual Significance
- Gallery Preview

---

## 5. Gallery in About Section

Include a **carousel** inside the About section.

Display **3 images** on the homepage.

---

## 6. Replace Middle CTA

Replace the existing **“Book Pooja / Events”** section with **“View Festivals.”**

Behavior:

- Opens a dedicated Festivals page.

Keep a separate **Book Pooja** button elsewhere on the website.

---

## 7. Remove Home History Section

Delete the dedicated History section from the homepage.

---

## 8. Remove “The Sacred Ecology”

Delete this section entirely without replacement.

---

## 9. Reduce Homepage Poojas

Display only **3 poojas** on the homepage.

Include a **View All Poojas** button.

---

# Navigation Bar

## 10. Navbar Cleanup

Navbar should contain:

- Home
- About
- Festivals
- Poojas
- Donations
- Contact
- FAQ

Requirements:

- Sticky while scrolling
- Proper spacing between items
- Search icon retained and fixed
- Cleaner alignment and padding

---

# Contact Section

## 11. Floating Contact Button

Replace the existing contact card with a **small rounded floating button** positioned on the right side.

The button should act as an **anchor / shortcut to the Contact page**, not as a full information card.

---

## 12. Remove Contact Message Form

Delete the message/contact form completely.

---

# Donation Section

## 13. Remove Heart Graphics

Remove decorative heart icons and heart-related graphics.

Keep the donation functionality intact.

---

# Footer

## 14. Simplify Footer

Footer should contain only:

- Temple logo
- Temple name
- Copyright
- Quick links
- Contact information
- Social media icons

Remove:

- Long description
- Timings block
- Excessive quick access links
- Crowded layout

Use a **clean minimal footer**.

---

# Pooja Section

## 15. Change Pooja Tabs

Replace the current tab system with either:

- Filter buttons
- Dropdown filter

Categories:

- Daily Poojas
- Special Poojas
- Festival Poojas
- Monthly Offerings

---

# Gallery

## 16. Remove Rituals Category

Remove the **Rituals** tab/category from the Gallery section.

---

# Search

## 17. Fix Search

Current issues:

- No results
- Does not filter content

Search should cover the entire website including:

- Poojas
- Festivals
- FAQs
- Announcements
- All major pages

---

# Booking & Receipts

## 18. Fix Receipt Generation

Current issues:

- PDF generation problems
- Multiple duplicate pages
- Excessive whitespace
- Colors not visible

Fix all receipt generation and printing issues.

---

## 19. Receipt Color

Use a simple **white background with black text** receipt design optimized for printing.

---

# Admin Portal

## 20. Admin Access

The **Admin Portal link should appear only in the footer.**

Technology remains **Next.js**.

---

# Admin Portal Fixes

## Daily Ritual Timings

Fix:

- Timings not saving
- Timings not editable

---

## Events & Festivals

Enable full CRUD:

- Add
- Edit
- Delete
- Image upload

---

## Poojas

Enable full CRUD:

- Add
- Edit
- Delete
- Image upload

---

## Gallery

Fix:

- Upload
- Edit
- Delete

---

## FAQ

Enable:

- Add
- Edit
- Delete

---

## Announcements

Fix the same CRUD and upload issues affecting other sections.

---

## Authentication

Remove **Google SSO**.

Use **email/password authentication only**.

---

# Content Handling

Preserve all existing data where possible.

Use placeholders only when necessary.

---

# Technical Requirements

- Preserve the existing database
- Migrate existing data safely
- Maintain mobile responsiveness
- Do not modify SEO metadata or page titles
- Ensure all existing functionality continues working after redesign

---

# Final Instruction

The redesign should feel as though the website itself belongs to the Sacred Grove.

Nature should appear not as decoration, but as the **living guardian of the sacred**.