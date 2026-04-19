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
- Hero title
- Hero subtext
- CTA text
- Value title
- Value subtext

### Services
Use `Service` to update the service cards on the homepage and services page:
- Title
- Description
- Image
- Bullet points
- Featured toggle
- Order

### Services Page
Use `Services Page` to update:
- Why Choose section heading
- Intro text
- Reasons
- Content Solutions heading
- Video title
- Contact heading
- Embedded video URL

### Blogs
Use `Blog` to update:
- Blog title
- Slug
- Excerpt
- Author
- Publish date
- Read time
- Banner image
- Full article content

### Videos
Use `Video` to update:
- Video title
- YouTube URL

### Testimonials
Use `Testimonial` to update:
- Company name
- Quote
- Rating
- Location

### Founders
Use `Founder` to update:
- Name
- Role
- Bio
- Photo
- LinkedIn URL

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
