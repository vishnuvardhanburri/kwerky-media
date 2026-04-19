# Kwerky Media Studio

## Start the Studio

```bash
cd sanity
npm install
npm run dev
```

## Environment

Create a local `.env` file in this folder with:

```env
SANITY_STUDIO_PROJECT_ID=he1a2fn8
SANITY_STUDIO_DATASET=production
SANITY_PREVIEW_ORIGIN=http://localhost:3000
```

## What the client can edit

- Homepage text
- Services content
- Blog posts
- Videos
- Testimonials
- Founder details

## Preview flow

Open the website with:

```text
http://localhost:3000/?preview=true
```

Changes made in Sanity should appear instantly in preview mode.
