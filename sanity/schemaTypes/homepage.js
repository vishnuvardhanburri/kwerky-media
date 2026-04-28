export const homepage = {
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "value", title: "Value Section" },
    { name: "servicesPreview", title: "Services Preview" },
    { name: "testimonials", title: "Testimonials" },
    { name: "cta", title: "Final CTA" },
  ],
  fields: [
    {
      name: "mainHeading",
      title: "Main Heading",
      type: "string",
      description: "Main top heading on the homepage.",
      group: "hero",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "text",
      description: "Short supporting line under the heading.",
      rows: 3,
      group: "hero",
    },
    {
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "Text shown on the main call-to-action button.",
      group: "hero",
    },
    {
      name: "heroImage",
      title: "Hero Image / GIF",
      type: "image",
      description: "Main visual shown on the homepage.",
      options: { hotspot: true },
      group: "hero",
    },
    {
      name: "valueTitle",
      title: "Section Title",
      type: "string",
      description: "Title for the value section.",
      group: "value",
    },
    {
      name: "valueSub",
      title: "Description",
      type: "text",
      description: "Short paragraph for the value section.",
      rows: 4,
      group: "value",
    },
    {
      name: "services",
      title: "Services Preview",
      type: "array",
      description: "Short previews of the services shown on the homepage.",
      group: "servicesPreview",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Service Title",
              type: "string",
              description: "Name of the service.",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Short Description",
              type: "text",
              description: "One short line about the service.",
              rows: 3,
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              description: "Optional image for the service preview.",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
    },
    {
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      description: "Client reviews shown on the homepage.",
      group: "testimonials",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "company",
              title: "Company Name",
              type: "string",
              description: "Client or company name.",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "quote",
              title: "Review Text",
              type: "text",
              description: "Short testimonial text.",
              rows: 4,
            },
            {
              name: "rating",
              title: "Rating",
              type: "number",
              description: "Rating from 1 to 5.",
              validation: (Rule) => Rule.min(1).max(5),
            },
          ],
          preview: {
            select: {
              title: "company",
              subtitle: "quote",
              rating: "rating",
            },
          },
        },
      ],
    },
    {
      name: "ctaHeading",
      title: "CTA Heading",
      type: "string",
      description: "Heading shown above the final call to action.",
      group: "cta",
    },
    {
      name: "ctaSubtext",
      title: "CTA Subtext",
      type: "text",
      description: "Short text below the final CTA heading.",
      rows: 3,
      group: "cta",
    },
  ],
  preview: {
    select: {
      title: "mainHeading",
      subtitle: "valueTitle",
    },
  },
};
