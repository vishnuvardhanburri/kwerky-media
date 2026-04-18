export const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "points", title: "Points", type: "array", of: [{ type: "string" }] },
    { name: "featured", title: "Featured on Homepage", type: "boolean", initialValue: false },
    { name: "order", title: "Order", type: "number" },
  ],
};

