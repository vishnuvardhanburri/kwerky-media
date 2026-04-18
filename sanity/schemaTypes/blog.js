export const blog = {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "author", title: "Author", type: "string" },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "readTime", title: "Read Time", type: "string" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "content", title: "Content", type: "array", of: [{ type: "string" }] },
  ],
};

