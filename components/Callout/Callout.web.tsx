import { StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: BrandColors.burgundy,
    paddingTop: 64,
    paddingBottom: 80,
    paddingHorizontal: 64,
    borderRadius: 8,
  },
  title: {
    fontFamily: BrandFonts.heading,
    fontSize: 60,
    color: BrandColors.white,
    textAlign: "center",
    marginBottom: 24,
  },
  body: {
    fontFamily: BrandFonts.body,
    fontSize: 18,
    color: BrandColors.white,
    textAlign: "center",
    lineHeight: 28,
    maxWidth: 896,
    alignSelf: "center",
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
