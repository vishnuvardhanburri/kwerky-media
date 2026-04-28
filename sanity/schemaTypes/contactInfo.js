export const contactInfo = {
  name: "contactInfo",
  title: "Contact Information",
  type: "document",
  groups: [
    { name: "details", title: "Details" },
    { name: "social", title: "Social Links" },
  ],
  fields: [
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      description: "Main phone number displayed across the website.",
      group: "details",
    },
    {
      name: "emailAddress",
      title: "Email Address",
      type: "string",
      description: "Main email address displayed across the website.",
      group: "details",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      description: "Primary office or city name.",
      group: "details",
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      description: "Website links to your social profiles.",
      group: "social",
      of: [{ type: "url" }],
    },
  ],
  preview: {
    select: {
      title: "phoneNumber",
      subtitle: "emailAddress",
    },
  },
};
