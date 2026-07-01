import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#D1D1D1",
    marginVertical: 24,
  },
});

export const Divider = () => <View style={styles.divider} />;
