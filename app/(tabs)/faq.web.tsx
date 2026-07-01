import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "@/components/Container/Container";
import { FaqList } from "@/components/Faq/FaqList";
import { Loader } from "@/components/Loader";
import { WebLayout } from "@/components/WebLayout/WebLayout";
import { BrandColors } from "@/constants/theme";
import { useFaqs } from "@/hooks/use-faqs";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BrandColors.white,
  },
});

const FaqScreen = () => {
  const { data: faqs, isLoading } = useFaqs();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={["top"]}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <WebLayout>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Container>
          <FaqList title="FAQ" faqs={faqs ?? []} />
        </Container>
      </SafeAreaView>
    </WebLayout>
  );
};

export default FaqScreen;
