import { StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";
import type { FaqType } from "@/model/index";
import { FaqItem } from "./FaqItem";

const styles = StyleSheet.create({
  container: {},
  title: {
    fontFamily: BrandFonts.heading,
    fontSize: 40,
    lineHeight: 48,
    paddingTop: 48,
    color: BrandColors.burgundy,
    textAlign: "left",
  },
});

type FaqListProps = {
  readonly title: string;
  readonly faqs: readonly FaqType[];
};

export const FaqList = ({ title, faqs }: FaqListProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {faqs.map((faq) => (
      <FaqItem key={faq.system.id} faq={faq} />
    ))}
  </View>
);
