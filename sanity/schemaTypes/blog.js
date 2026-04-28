export const blog = {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Headline for the blog post.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated link for the blog post.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      description: "Short summary shown on blog cards.",
      rows: 4,
    },
    {
      name: "publishDate",
      title: "Publish Date",
      type: "datetime",
      description: "Date and time this blog should appear.",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Main image shown for the blog post and card.",
      options: { hotspot: true },
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      description: "The main blog content.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                title: "Link",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "shortDescription",
      media: "coverImage",
    },
  },
};
