import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation/Navigation";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  containerWide: {
    paddingHorizontal: 32,
    gap: 32,
  },
});

export const Header = () => {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      <Logo />
      <Navigation />
    </View>
  );
};
