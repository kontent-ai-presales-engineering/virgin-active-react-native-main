import { useQuery } from "@tanstack/react-query";
import type { ArticleType } from "@/model/index";
import { usePreviewMode } from "@/providers/preview-mode-provider";
import { createKontentClient } from "@/utils/client";

export const useArticle = (id: string | undefined) => {
  const { isPreview } = usePreviewMode();

  return useQuery({
    queryKey: ["article", id, { isPreview }],
    queryFn: async () => {
      const client = createKontentClient(isPreview);
      const response = await client
        .items<ArticleType>()
        .type("article")
        .equalsFilter("system.id", id ?? "")
        .depthParameter(1)
        .toPromise();
      return response.data.items[0] ?? null;
    },
    enabled: !!id,
  });
};
