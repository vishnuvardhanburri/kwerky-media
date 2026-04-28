# Kwerky Media Studio

This Studio controls the editable content for the Kwerky Media website.
The UI on the website stays the same. Only content changes.

## Start the Studio

```bash
cd sanity
npm install
npm run dev
```

## Environment

Create a `.env` file in this folder with:

```env
SANITY_STUDIO_PROJECT_ID=he1a2fn8
SANITY_STUDIO_DATASET=production
SANITY_PREVIEW_ORIGIN=http://localhost:3000
```

## What the client can edit

### Homepage
Use `Homepage` to update:
- Main heading
- Tagline
- Button text
- Hero image or GIF
- Value section title
- Value section description
- Services preview cards
- Testimonials
- Final CTA text

### Services Page
Use `Services Page` to update:
- Page title
- Intro description
- Service list shown on the page

### Blogs
Use `Blog` to update:
- Blog title
- Slug
- Short description
- Publish date
- Cover image
- Full article content

### Videos
Use `Video` to update:
- Video title
- Video URL

### About Page
Use `About Page` to update:
- About title
- Description
- Founder cards

### Contact Information
Use `Contact Information` to update:
- Phone number
- Email address
- Location
- Social links

## Preview flow

Open the website with:

```text
http://localhost:3000/?preview=true
```

Preview mode shows draft content instantly. No refresh or redeploy is needed.

## Client workflow

1. Open Sanity Studio
2. Click a content type
3. Edit text or upload an image
4. Open preview in the browser
5. See the site update instantly
6. Publish when ready

## Notes

- Only the newsletter form exists on the website.
- The contact CTA opens the contact drawer, not a form.
- WhatsApp keeps its original green color.
- Yellow is only used as a small accent in headings.
