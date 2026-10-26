import { defineCliConfig } from "sanity/cli";

// Lets `npx sanity …` commands (dataset import/export, CORS, tokens) find this project.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
