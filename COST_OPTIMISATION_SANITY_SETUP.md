# Cost Optimisation Page - Sanity CMS Setup

## Overview
The Cost Optimisation page is fully integrated with Sanity CMS, allowing you to edit all content, images, buttons, and links directly from Sanity Studio.

## Data Flow

```
Sanity Studio (costOptimisationPage document)
    ↓
getCostOptimisationPageQuery() - Fetches all fields
    ↓
getCostOptimisationPageData() - Executes query
    ↓
src/app/cost-optimisation/page.tsx - Receives data
    ↓
Components - Display Sanity data with fallbacks
```

## Connected Sections

### 1. Hero Section
- **mainHeading** - Main heading text (supports HTML)
- **subheading** - Subheading text
- **animatedTexts** - Array of texts that cycle (e.g., "Cost", "Size", "Configuration")
- **animatedTextPrefix** - Text before animated text ("Optimize")
- **animatedTextSuffix** - Text after animated text ("of your AWS Infrastructure")
- **ctaButtons** - Array of CTA buttons (label, url, openInNewTab, buttonType)
- **heroImage** - Hero section image

### 2. Client Section
- **title** - Section title
- **stats** - Array of stats (title, description)
- **partnerLogos** - Array of partner logos (name, alt, logo image)

### 3. Industry Facts Section
- **title** - Section title (supports HTML)
- **subtitle** - Section subtitle
- **facts** - Array of industry facts (fact text, source, report, image)

### 4. Root Case Section
- **title** - Section title
- **videoUrl** - Video URL or video file

### 5. Testimonials Section
- **title** - Section title
- **testimonials** - Array of testimonials (quote, name, title, company, image, savings)

### 6. Our Approach Section
- **title** - Section title
- **subtitle** - Section subtitle
- **steps** - Array of approach steps (heading, oneLiner, details, image, isReversed)

### 7. Get Started Section
- **logo** - Logo image
- **heading** - Main heading
- **bodyText** - Body text
- **chips** - Array of chips (icon, text)
- **ctaButtons** - Array of CTA buttons
- **backgroundImage** - Background image
- **whatsappLink** - WhatsApp link URL
- **scheduleLink** - Schedule meeting link URL

### 8. Steps Section
- **title** - Section title
- **subtitle** - Section subtitle
- **steps** - Array of steps (headline, duration, points, iconName, image)

## How to Use

### 1. Seed Initial Data
Run the seed script to populate initial content:
```bash
cd studio-cloud-consulting
sanity exec scripts/seed-cost-optimisation-page.ts --with-user-token
```

### 2. Edit Content in Sanity Studio
1. Open Sanity Studio
2. Navigate to "Cost Optimisation Page" document
3. Edit any section you want to change
4. Changes will appear on the website after saving

### 3. Add/Edit Content
- **Text Content**: Edit directly in Sanity Studio fields
- **Images**: Upload new images or replace existing ones
- **Buttons**: Edit button labels, URLs, and button types
- **Arrays**: Add, remove, or reorder items in arrays (testimonials, facts, steps, etc.)

## Fallback Behavior
If Sanity data is not available, components will use default/hardcoded values to ensure the page still renders correctly.

## Query Location
The Sanity query is defined in: `src/lib/sanity/queries.ts` → `getCostOptimisationPageQuery()`

## Schema Location
The Sanity schema is defined in:
- `studio-cloud-consulting/schemaTypes/cost-optimisation-page.ts`
- `studio-cloud-consulting/schemaTypes/cost-optimisation-page-types.ts`

