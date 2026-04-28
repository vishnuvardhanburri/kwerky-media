export const servicesPage = {
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  groups: [
    { name: "intro", title: "Intro" },
    { name: "services", title: "Services" },
  ],
  fields: [
    {
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Title shown at the top of the services page.",
      group: "intro",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "introDescription",
      title: "Intro Description",
      type: "text",
      description: "Short introduction under the page title.",
      rows: 4,
      group: "intro",
    },
    {
      name: "services",
      title: "Services",
      type: "array",
      description: "Each item represents one service shown on the page.",
      group: "services",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "serviceName",
              title: "Service Name",
              type: "string",
              description: "Name of the service.",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              description: "Short explanation of the service.",
              rows: 4,
            },
          ],
          preview: {
            select: {
              title: "serviceName",
              subtitle: "description",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "pageTitle",
      subtitle: "introDescription",
    },
  },
};
