import { StyleSheet, Text, View } from "react-native";
import { BrandColors } from "@/constants/theme";
import { Logo } from "../Logo";
import { Navigation } from "../Navigation/Navigation";

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: BrandColors.white,
  },
  content: {
    alignItems: "center",
    gap: 40,
    paddingVertical: 80,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#D1D1D1",
  },
  copyright: {
    fontSize: 16,
    color: BrandColors.grayLight,
    paddingVertical: 60,
    textAlign: "center",
  },
});

export const Footer = () => (
  <View style={styles.wrapper}>
    <View style={styles.content}>
      <Logo />
      <Navigation />
    </View>
    <View style={styles.divider} />
    <Text style={styles.copyright}>©2024 Join a Gym. All Rights Reserved.</Text>
  </View>
);
