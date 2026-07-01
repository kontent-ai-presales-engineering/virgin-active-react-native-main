import { useQuery } from "@tanstack/react-query";
import type { ArticleType } from "@/model/index";
import { usePreviewMode } from "@/providers/preview-mode-provider";
import { createKontentClient } from "@/utils/client";

export const useArticles = () => {
  const { isPreview } = usePreviewMode();

  return useQuery({
    queryKey: ["articles", { isPreview }],
    queryFn: async () => {
      const client = createKontentClient(isPreview);
      const response = await client
        .items<ArticleType>()
        .type("article")
        .orderByDescending("elements.publish_date")
        .toPromise();
      return response.data.items;
    },
  });
};
