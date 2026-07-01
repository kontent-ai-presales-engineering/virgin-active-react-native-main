import { useQuery } from "@tanstack/react-query";
import type { FaqType } from "@/model/index";
import { usePreviewMode } from "@/providers/preview-mode-provider";
import { createKontentClient } from "@/utils/client";

export const useFaqs = () => {
  const { isPreview } = usePreviewMode();

  return useQuery({
    queryKey: ["faqs", { isPreview }],
    queryFn: async () => {
      const client = createKontentClient(isPreview);
      const response = await client.items<FaqType>().type("faq").toPromise();
      return response.data.items;
    },
  });
};
