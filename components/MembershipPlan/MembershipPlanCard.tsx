import { Pressable, StyleSheet, Text, View } from "react-native";
import { RichText } from "@/components/RichText";
import { BrandColors, BrandFonts } from "@/constants/theme";
import type { MembershipPlanType } from "@/model/index";

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BrandColors.grayLight,
  },
  name: {
    fontFamily: BrandFonts.heading,
    fontSize: 28,
    color: BrandColors.burgundy,
  },
  tagline: {
    fontFamily: BrandFonts.body,
    fontSize: 16,
    color: BrandColors.gray,
  },
  price: {
    fontFamily: BrandFonts.heading,
    fontSize: 36,
    color: BrandColors.azure,
  },
  priceUnit: {
    fontFamily: BrandFonts.body,
    fontSize: 16,
    color: BrandColors.grayLight,
  },
  button: {
    marginTop: 12,
    backgroundColor: BrandColors.burgundy,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontFamily: BrandFonts.body,
    fontSize: 16,
    color: BrandColors.white,
    fontWeight: "600",
  },
});

type MembershipPlanCardProps = {
  readonly plan: MembershipPlanType;
};

export const MembershipPlanCard = ({ plan }: MembershipPlanCardProps) => {
  const { name, tagline, monthly_price, features, cta_label } = plan.elements;

  return (
    <View style={styles.container}>
      {!!name?.value && <Text style={styles.name}>{name.value}</Text>}
      {!!tagline?.value && <Text style={styles.tagline}>{tagline.value}</Text>}
      {monthly_price?.value != null && (
        <Text style={styles.price}>
          £{monthly_price.value}
          <Text style={styles.priceUnit}> /mo</Text>
        </Text>
      )}
      {!!features?.value && <RichText value={features.value} />}
      {!!cta_label?.value && (
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>{cta_label.value}</Text>
        </Pressable>
      )}
    </View>
  );
};
