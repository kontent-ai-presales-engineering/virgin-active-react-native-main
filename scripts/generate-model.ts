import { generateDeliveryModelsAsync, resolveCase } from "@kontent-ai/model-generator";
import dotenv from "dotenv";

dotenv.config();

const environmentId = process.env.EXPO_PUBLIC_KONTENT_ENVIRONMENT_ID;
const managementApiKey = process.env.KONTENT_MANAGEMENT_API_KEY;

if (!environmentId) {
  throw new Error("EXPO_PUBLIC_KONTENT_ENVIRONMENT_ID is not defined");
}

if (!managementApiKey) {
  throw new Error("KONTENT_MANAGEMENT_API_KEY is not defined");
}

void (async () => {
  await generateDeliveryModelsAsync({
    environmentId,
    managementApiKey,
    addTimestamp: false,
    createFiles: true,
    outputDir: "./model",
    moduleFileExtension: "ts",
    fileResolvers: {
      taxonomy: (taxonomy) => resolveCase(taxonomy.codename, "camelCase"),
      contentType: (type) => resolveCase(type.codename, "camelCase"),
      snippet: (snippet) => resolveCase(snippet.codename, "camelCase"),
    },
    formatOptions: {
      printWidth: 120,
      tabWidth: 2,
      useTabs: false,
      trailingComma: "all",
      parser: "typescript",
    },
  });
})();
