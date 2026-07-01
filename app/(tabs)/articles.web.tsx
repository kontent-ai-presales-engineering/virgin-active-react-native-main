import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArticlesList } from "@/components/ArticlesList";
import { Container } from "@/components/Container/Container";
import { Loader } from "@/components/Loader";
import { WebLayout } from "@/components/WebLayout/WebLayout";
import { BrandColors } from "@/constants/theme";
import { useArticles } from "@/hooks/use-articles";

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

const ArticlesScreen = () => {
  const router = useRouter();
  const { data: articles, isLoading } = useArticles();

  const handleArticlePress = (id: string) => {
    router.push(`/article/${id}`);
  };

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
          <ArticlesList
            title="Articles"
            articles={articles ?? []}
            onArticlePress={handleArticlePress}
          />
        </Container>
      </SafeAreaView>
    </WebLayout>
  );
};

export default ArticlesScreen;
