import { useRouter } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArticlesList } from "@/components/ArticlesList";
import { Loader } from "@/components/Loader";
import { BrandColors } from "@/constants/theme";
import { useArticles } from "@/hooks/use-articles";

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

const ArticlesScreen = () => {
  const router = useRouter();
  const { data: articles, isLoading, refetch, isRefetching } = useArticles();

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
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      >
        <ArticlesList
          title="Articles"
          articles={articles ?? []}
          onArticlePress={handleArticlePress}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticlesScreen;
