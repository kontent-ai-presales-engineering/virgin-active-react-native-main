import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
] as const;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: BrandFonts.body,
    fontSize: 16,
    color: BrandColors.gray,
  },
  textHovered: {
    color: BrandColors.burgundy,
  },
});

type NavItemProps = {
  readonly label: string;
  readonly href: string;
};

const NavItem = ({ label, href }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href as "/"} asChild={true}>
      <Pressable
        style={styles.item}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        <Text style={[styles.text, isHovered && styles.textHovered]}>{label}</Text>
      </Pressable>
    </Link>
  );
};

export const Navigation = () => (
  <View style={styles.container}>
    {MENU_ITEMS.map((item) => (
      <NavItem key={item.href} label={item.label} href={item.href} />
    ))}
  </View>
);
