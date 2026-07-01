import { StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";
import type { MembershipPlanType } from "@/model/index";
import { MembershipPlanCard } from "./MembershipPlanCard";

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  title: {
    fontFamily: BrandFonts.heading,
    fontSize: 40,
    lineHeight: 48,
    paddingTop: 48,
    color: BrandColors.burgundy,
    textAlign: "left",
  },
});

type MembershipPlanListProps = {
  readonly title: string;
  readonly plans: readonly MembershipPlanType[];
};

export const MembershipPlanList = ({ title, plans }: MembershipPlanListProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {plans.map((plan) => (
      <MembershipPlanCard key={plan.system.id} plan={plan} />
    ))}
  </View>
);
