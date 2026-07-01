import { useQuery } from "@tanstack/react-query";
import type { LandingPageType } from "@/model/index";
import { usePreviewMode } from "@/providers/preview-mode-provider";
import { createKontentClient } from "@/utils/client";

export const useLandingPage = () => {
  const { isPreview } = usePreviewMode();

  return useQuery({
    queryKey: ["landing-page", { isPreview }],
    queryFn: async () => {
      const client = createKontentClient(isPreview);
      const response = await client
        .items<LandingPageType>()
        .type("landing_page")
        .limitParameter(1)
        .toPromise();
      return response.data.items[0] ?? null;
    },
  });
};
