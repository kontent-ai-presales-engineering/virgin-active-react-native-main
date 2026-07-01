import { StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: BrandColors.burgundy,
    padding: 24,
    borderRadius: 8,
  },
  title: {
    fontFamily: BrandFonts.heading,
    fontSize: 24,
    color: BrandColors.white,
    textAlign: "center",
    marginBottom: 12,
  },
  body: {
    fontFamily: BrandFonts.body,
    fontSize: 14,
    color: BrandColors.white,
    textAlign: "center",
    lineHeight: 22,
  },
});

type CalloutProps = {
  readonly title: string;
  readonly body: string;
};

export const Callout = ({ title, body }: CalloutProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.body}>{body}</Text>
  </View>
);
