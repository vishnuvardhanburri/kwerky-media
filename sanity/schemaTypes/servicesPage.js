export const servicesPage = {
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    { name: "heroTitle", title: "Hero Title", type: "string" },
    { name: "heroSub", title: "Hero Sub", type: "text" },
    { name: "reasons", title: "Reasons", type: "array", of: [{ type: "string" }] },
    { name: "contentTitle", title: "Content Title", type: "string" },
    { name: "contentSub", title: "Content Sub", type: "text" },
    { name: "videoTitle", title: "Video Title", type: "string" },
    { name: "contactTitle", title: "Contact Title", type: "string" },
    { name: "videoUrl", title: "Video URL", type: "url" },
  ],
};

