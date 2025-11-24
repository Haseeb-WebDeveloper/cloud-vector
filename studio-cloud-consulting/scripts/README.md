# Sanity Seed Scripts

## Seed Testimonials

This script imports the existing testimonials from the codebase into Sanity.

## Seed Homepage

This script imports all homepage content from the codebase into Sanity, including:
- Hero section (heading, animated texts, CTA buttons)
- Client section (stats, partner logos)
- Animated sections (offers, stats, images)
- Value props section
- Get started section
- FAQ section

### Prerequisites

1. Make sure you have a Sanity auth token. You can get one by running:
   ```bash
   sanity login
   ```

2. Or set the `SANITY_AUTH_TOKEN` environment variable.

### Running the Script

**Option 1: Using Sanity CLI (Recommended)**
```bash
cd studio-cloud-consulting
sanity exec scripts/seed-testimonials.ts --with-user-token
```

**Option 2: Using tsx directly**
```bash
cd studio-cloud-consulting
npx tsx scripts/seed-testimonials.ts
```

### After Running

1. The script will create all testimonial documents in Sanity
2. You'll need to manually upload the testimonial images in Sanity Studio:
   - Go to each testimonial document
   - Upload the corresponding image from `/public/testimonials/`
   - The image paths are:
     - `/testimonials/Harsh-Vardhan-Sharma.png`
     - `/testimonials/Chirag-Gupta.png`
     - `/testimonials/Ishan-Mohammed.png`
     - `/testimonials/Paresh-Deshmukh.png`
     - `/testimonials/Sreepad-Krishnan-Mavila.png`
     - `/testimonials/Pramin-Pradeep.png`

### Notes

- The script checks for existing testimonials to avoid duplicates
- Images need to be uploaded separately as Sanity requires them to be uploaded through the Studio or API with proper asset handling

## Seed Homepage

### Running the Script

**Option 1: Using npm script (Recommended)**
```bash
cd studio-cloud-consulting
npm run seed:homepage
```

**Option 2: Using Sanity CLI directly**
```bash
cd studio-cloud-consulting
sanity exec scripts/seed-homepage.ts --with-user-token
```

### After Running

1. The script will create or update the homepage document in Sanity
2. All images will be automatically uploaded (partner logos, step images, center image, logo, background image)
3. You'll need to manually select testimonials in Sanity Studio:
   - Go to the Home Page document
   - In the Testimonials Section, click "Add item" and select testimonials from the dropdown
   - Make sure you've run `seed:testimonials` first to have testimonials available

### Notes

- The script will update an existing homepage if one exists, or create a new one
- All images are automatically uploaded from the `/public` folder
- Testimonials must be selected manually via references in Sanity Studio
- The script handles all sections: Hero, Client, Animated Sections, Value Props, Get Started, Testimonials (references), and FAQ

