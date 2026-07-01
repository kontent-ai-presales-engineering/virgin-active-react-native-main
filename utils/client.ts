import { createDeliveryClient } from "@kontent-ai/delivery-sdk";

const environmentId = process.env.EXPO_PUBLIC_KONTENT_ENVIRONMENT_ID;
const previewApiKey = process.env.EXPO_PUBLIC_KONTENT_PREVIEW_API_KEY;

if (!environmentId) {
  throw new Error("EXPO_PUBLIC_KONTENT_ENVIRONMENT_ID is not defined in .env");
}

export const createKontentClient = (isPreview: boolean) =>
  createDeliveryClient({
    environmentId,
    ...(isPreview && previewApiKey
      ? {
          previewApiKey,
          defaultQueryConfig: { usePreviewMode: true, waitForLoadingNewContent: true },
        }
      : {}),
  });
