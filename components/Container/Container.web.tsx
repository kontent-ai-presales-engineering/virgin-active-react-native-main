import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 1536,
    alignSelf: "center",
    paddingHorizontal: 12,
  },
});

type ContainerProps = {
  readonly children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => (
  <View style={styles.container}>{children}</View>
);
