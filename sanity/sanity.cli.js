export default {
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.REACT_APP_SANITY_PROJECT_ID || "YOUR_PROJECT_ID",
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.REACT_APP_SANITY_DATASET || "production",
  },
};

