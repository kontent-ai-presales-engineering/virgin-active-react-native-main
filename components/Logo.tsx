import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { BrandColors, BrandFonts } from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  text: {
    fontFamily: BrandFonts.heading,
    fontSize: 42,
    color: BrandColors.azure,
    letterSpacing: 1,
  },
});

export const Logo = () => (
  <Link href="/" asChild={true}>
    <Pressable style={styles.container}>
      <Svg width={40} height={40} viewBox="0 0 40 40">
        <Rect x={0} y={13} width={40} height={14} rx={2.4} fill={BrandColors.burgundy} />
        <Rect x={13} y={0} width={14} height={40} rx={2.4} fill={BrandColors.burgundy} />
      </Svg>
      <Text style={styles.text}>Karma Health</Text>
    </Pressable>
  </Link>
);
