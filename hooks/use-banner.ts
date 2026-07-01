import { useQuery } from "@tanstack/react-query";
import type { BannerType } from "@/model/index";
import { usePreviewMode } from "@/providers/preview-mode-provider";
import { createKontentClient } from "@/utils/client";

export const useBanner = () => {
  const { isPreview } = usePreviewMode();

  return useQuery({
    queryKey: ["banner", { isPreview }],
    queryFn: async () => {
      const client = createKontentClient(isPreview);
      const response = await client
        .items<BannerType>()
        .type("banner")
        .limitParameter(1)
        .toPromise();
      return response.data.items[0] ?? null;
    },
  });
};
