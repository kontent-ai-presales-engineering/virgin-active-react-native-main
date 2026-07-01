import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FaqList } from "@/components/Faq/FaqList";
import { Loader } from "@/components/Loader";
import { BrandColors } from "@/constants/theme";
import { useFaqs } from "@/hooks/use-faqs";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  scrollContent: {
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BrandColors.white,
  },
});

const FaqScreen = () => {
  const { data: faqs, isLoading, refetch, isRefetching } = useFaqs();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={["top"]}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      >
        <FaqList title="FAQ" faqs={faqs ?? []} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FaqScreen;
