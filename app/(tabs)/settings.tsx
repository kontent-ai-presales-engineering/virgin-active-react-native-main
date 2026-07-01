import { StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BrandColors } from "@/constants/theme";
import { usePreviewMode } from "@/providers/preview-mode-provider";

export default function SettingsScreen() {
  const { isPreview, togglePreview } = usePreviewMode();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.settingRow}>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingLabel}>Preview Mode</Text>
          <Text style={styles.settingDescription}>
            Show draft and unpublished content from Kontent.ai
          </Text>
        </View>
        <Switch
          value={isPreview}
          onValueChange={togglePreview}
          trackColor={{ false: BrandColors.grayLight, true: BrandColors.burgundy }}
          thumbColor={BrandColors.white}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: BrandColors.gray,
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BrandColors.grayLight,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: BrandColors.gray,
  },
  settingDescription: {
    fontSize: 14,
    color: BrandColors.grayLight,
    marginTop: 4,
  },
});
