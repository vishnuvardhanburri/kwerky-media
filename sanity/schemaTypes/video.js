export const video = {
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Title shown for the video.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube or Vimeo link to the video.",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "videoUrl",
    },
  },
};
