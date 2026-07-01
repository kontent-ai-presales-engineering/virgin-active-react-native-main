import { useLocalSearchParams } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loader } from "@/components/Loader";
import { RichText } from "@/components/RichText";
import { BrandColors, BrandFonts } from "@/constants/theme";
import { useArticle } from "@/hooks/use-article";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: BrandColors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 24,
    gap: 16,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: BrandColors.azure,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgeText: {
    color: BrandColors.white,
    fontFamily: BrandFonts.body,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },
  title: {
    fontFamily: BrandFonts.heading,
    fontSize: 32,
    color: BrandColors.burgundy,
    lineHeight: 40,
  },
  date: {
    fontFamily: BrandFonts.body,
    fontSize: 14,
    color: BrandColors.grayLight,
  },
  perex: {
    fontFamily: BrandFonts.body,
    fontSize: 18,
    fontWeight: "600",
    color: BrandColors.gray,
    lineHeight: 28,
  },
});

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ArticleDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: article, isLoading, refetch, isRefetching } = useArticle(id);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={["top"]}>
        <Loader />
      </SafeAreaView>
    );
  }

  if (!article?.elements) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Article not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { title, perex, published_date, body } = article.elements;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ARTICLE</Text>
          </View>
          {!!title?.value && <Text style={styles.title}>{title.value}</Text>}
          {!!published_date?.value && (
            <Text style={styles.date}>{formatDate(published_date.value)}</Text>
          )}
          {!!perex?.value && <Text style={styles.perex}>{perex.value}</Text>}
          {!!body?.value && <RichText value={body.value} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
