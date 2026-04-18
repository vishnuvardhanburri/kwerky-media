export const founder = {
  name: "founder",
  title: "Founder",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "bio", title: "Bio", type: "text" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "linkedinUrl", title: "LinkedIn URL", type: "url" },
    { name: "order", title: "Order", type: "number" },
  ],
};

