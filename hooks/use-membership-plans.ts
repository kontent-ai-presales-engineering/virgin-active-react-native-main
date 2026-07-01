import { useQuery } from "@tanstack/react-query";
import type { MembershipPlanType } from "@/model/index";
import { usePreviewMode } from "@/providers/preview-mode-provider";
import { createKontentClient } from "@/utils/client";

export const useMembershipPlans = () => {
  const { isPreview } = usePreviewMode();

  return useQuery({
    queryKey: ["membership-plans", { isPreview }],
    queryFn: async () => {
      const client = createKontentClient(isPreview);
      const response = await client
        .items<MembershipPlanType>()
        .type("membership_plan")
        .orderByAscending("elements.monthly_price")
        .toPromise();
      return response.data.items;
    },
  });
};
