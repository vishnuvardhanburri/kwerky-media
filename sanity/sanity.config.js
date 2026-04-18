import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes/index.js";

export default defineConfig({
  name: "default",
  title: "Kwerky Media Studio",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.REACT_APP_SANITY_PROJECT_ID || "YOUR_PROJECT_ID",
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.REACT_APP_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

