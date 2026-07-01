import { Image } from "expo-image";
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
  heroImage: {
    width: "100%",
    aspectRatio: 16 / 9,
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
  introduction: {
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

  const { title, introduction, image, publish_date, body_copy } = article.elements;
  const imageUrl = image?.value?.[0]?.url;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>
        {!!imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.heroImage} contentFit="cover" />
        )}
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ARTICLE</Text>
          </View>
          {!!title?.value && <Text style={styles.title}>{title.value}</Text>}
          {!!publish_date?.value && (
            <Text style={styles.date}>{formatDate(publish_date.value)}</Text>
          )}
          {!!introduction?.value && <Text style={styles.introduction}>{introduction.value}</Text>}
          {!!body_copy?.value && (
            <RichText value={body_copy.value} linkedItems={body_copy.linkedItems} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
