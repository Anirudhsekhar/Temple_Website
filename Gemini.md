# GEMINI.md

# Mevakkatu Shree Nagaraja Kshetram
## Functional Specification & AI Development Guide

---

# Purpose

This document defines the complete functionality, architecture, business logic, and implementation requirements for the Mevakkatu Shree Nagaraja Kshetram website.

This file should be treated as the functional source of truth while `brand-guidelines.md` should be treated as the visual source of truth.

If any ambiguity exists, prioritize:

1. User Experience
2. Maintainability
3. Reusability
4. Accessibility

---

# Project Goal

The primary objective of this website is to provide devotees with a centralized platform for accessing temple information and services.

The website should allow visitors to:

- Learn about the temple
- View temple history
- Browse festivals
- Explore galleries
- View poojas
- Book poojas
- Donate online
- Contact the temple
- Stay updated with announcements

The platform should also provide administrators with a complete content management system.

---

# User Roles

## Visitor

Visitors do not require authentication.

Visitors can:

- Browse the website
- View temple information
- View timings
- View festivals
- Search content
- Browse gallery
- View poojas
- Book poojas
- Donate online
- Contact temple
- Download receipts
- View FAQs

Visitors cannot:

- Modify website content
- Access admin dashboard

---

## Temple Administrator

Administrator authentication is required.

Admin can:

- Manage homepage
- Manage temple timings
- Manage events
- Manage festivals
- Manage poojas
- Manage gallery
- Manage FAQs
- Manage donations
- Manage announcements
- View user messages
- Upload files
- Edit website content

---

# Authentication

Only administrators require authentication.

Supported authentication methods:

- Email Login
- Google Login
- Phone OTP

Visitors never need an account.

---

# Website Pages

## Home

Purpose

Provide a quick overview of the temple.

Contains

- Hero Section
- Temple Introduction
- Temple Timings
- Upcoming Events
- Featured Festivals
- Gallery Preview
- Donation CTA
- Visitor Information
- Footer

---

## About

Contains general information about the temple.

(Currently use placeholder content.)

---

## Temple History

Contains historical information.

(Currently use placeholder content.)

---

## Gallery

Supports

- Images
- Videos
- Albums
- Categories
- Lightbox Viewer

(Currently use placeholder media.)

---

## Poojas

Allows users to

- Browse poojas
- Search poojas
- Filter poojas
- View details
- Book poojas
- Pay online
- Download receipts

---

## Contact

Contains

- Contact Form
- Phone Numbers
- Email
- Google Maps
- Emergency Contact

---

## Donation

Allows online donations.

Supports recurring donations.

Receipts should be generated automatically.

---

## FAQ

Displays commonly asked questions.

Admin should be able to edit FAQs.

---

## Admin Dashboard

Central management interface.

Modules

- Homepage
- Events
- Festivals
- Gallery
- Timings
- Poojas
- Donations
- Contact Messages
- FAQs
- Website Settings

---

# Homepage Structure

The homepage should follow this order:

1. Hero
2. Temple Introduction
3. Temple History
4. Sacred Grove
5. Daily Rituals
6. Upcoming Festivals
7. Gallery
8. Visitor Information
9. Donation CTA
10. Footer

---

# Hero Section

Contains

- Background Image
- Temple Name
- Temple Timings
- Primary CTA
- Secondary CTA

---

# Temple Introduction

Contains

- Temple Description
- Temple Image

---

# Daily Rituals

Display

- Ritual Name
- Timing
- Description
- Images

---

# Festival Module

Administrator should be able to

- Add Festival
- Edit Festival
- Delete Festival

Visitors can

- Browse festivals
- View schedules
- View galleries
- View calendar

---

# Pooja Module

Visitors should be able to

- Browse poojas
- Search poojas
- Filter poojas
- Book poojas
- Pay online
- Download receipt

Each pooja contains

- Name
- Description
- Date
- Star
- Devotee Name
- Price

---

# Gallery Module

Supports

- Images
- Videos
- Albums
- Categories
- Lightbox

Admin should upload media.

---

# Visitor Information

Contains

- Temple Timings
- Dress Code
- Parking
- Rules
- Photography Policy
- Google Maps
- Nearby Facilities

---

# Donation Module

Supports

- One-time Donations
- Recurring Donations

Each donation generates

- Payment Confirmation
- Receipt

Admin dashboard should display all donations.

---

# Contact Module

Contains

- Contact Form
- Email
- Phone
- Emergency Contact
- Google Maps

Messages should be stored.

---

# Search

Global search should include

- Events
- Festivals
- Poojas
- History
- Timings
- Entire website

---

# Notifications

Supports

- Announcement Banner
- Festival Alerts
- Popups

Admin should manage all notifications.

---

# Content Management System

Every editable section should be manageable from the admin dashboard.

Nothing should require modifying code.

Editable content includes

- Homepage
- Events
- Festivals
- Poojas
- Gallery
- FAQs
- Timings
- Contact Information
- Donation Details
- Website Settings

---

# Database

Store

- Events
- Festivals
- Gallery
- Poojas
- Donations
- Messages
- FAQs
- Timings
- Announcements

---

# Backend

Use

- Node.js
- Next.js
- REST API architecture

Database may be selected based on implementation requirements.

---

# Third Party Integrations

Google Maps

Payment Gateway

Email Service

SMS Service

---

# File Uploads

Administrator should upload

- Images
- Videos
- Documents

Uploads should be validated before storage.

---

# Performance

Implement

- Lazy Loading
- Pagination
- Infinite Scroll (Gallery where appropriate)
- Image Optimization
- Browser Caching

---

# Error Pages

Create custom

- 404
- 500
- Offline

Maintain consistent branding.

---

# Accessibility

Support

- Keyboard Navigation
- ARIA Labels
- Screen Readers
- High Contrast
- Reduced Motion

---

# Future Features

These are out of scope for version one but architecture should allow future implementation.

- Live Darshan
- Volunteer Registration
- Temple Shop
- Temple Blog
- Push Notifications
- Mobile Application

---

# Technical Stack

Framework

- Next.js

Language

- JavaScript

Styling

- Tailwind CSS

Animation

- Framer Motion

Backend

- Node.js

Database

- Flexible (implementation choice)

---

# Coding Standards

Mandatory

- Do not hardcode data
- Create reusable components
- Separate business logic from UI
- Centralize API calls
- Validate all forms
- Responsive by default
- Mobile-first
- Environment variables for secrets
- Modular architecture
- Clean folder structure

---

# Visitor Flow

Landing Page

↓

Temple Overview

↓

History

↓

Festivals

↓

Gallery

↓

Visitor Information

↓

Donation

↓

Contact

---

# Admin Flow

Login

↓

Dashboard

↓

Choose Module

↓

Create / Edit / Delete

↓

Preview

↓

Publish

---

# AI Development Instructions

When implementing this project:

- Never hardcode production content.
- Use reusable React components.
- Prefer composition over duplication.
- Build scalable modules that can grow in future releases.
- Keep UI, business logic, and API layers separate.
- Make every section editable through the CMS.
- Follow the design system defined in `brand-guidelines.md`.
- Prioritize accessibility and maintainability.
- Use semantic HTML and clean React patterns.
- Ensure all features are responsive across mobile, tablet, and desktop.
- Write code that is easy to extend for future features such as live darshan, volunteer registration, and a mobile application.
