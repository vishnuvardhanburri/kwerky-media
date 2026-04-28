export const aboutPage = {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "intro", title: "Intro" },
    { name: "founders", title: "Founders" },
  ],
  fields: [
    {
      name: "aboutTitle",
      title: "About Title",
      type: "string",
      description: "Main heading shown on the About page.",
      group: "intro",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Intro paragraph that explains the company story.",
      rows: 5,
      group: "intro",
    },
    {
      name: "founders",
      title: "Founders",
      type: "array",
      description: "Founder cards shown on the About page.",
      group: "founders",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              description: "Founder name.",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "bio",
              title: "Bio",
              type: "text",
              description: "Short founder bio.",
              rows: 6,
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              description: "Portrait photo for the founder.",
              options: { hotspot: true },
            },
            {
              name: "role",
              title: "Role",
              type: "string",
              description: "Optional role or title shown below the name.",
            },
            {
              name: "linkedinUrl",
              title: "LinkedIn URL",
              type: "url",
              description: "Optional LinkedIn profile link.",
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "role",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "aboutTitle",
      subtitle: "description",
    },
  },
};
