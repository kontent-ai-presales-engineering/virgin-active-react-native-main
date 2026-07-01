import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Container } from "@/components/Container/Container";
import { Loader } from "@/components/Loader";
import { RichText } from "@/components/RichText";
import { WebLayout } from "@/components/WebLayout/WebLayout";
import { BrandColors, BrandFonts } from "@/constants/theme";
import { useArticle } from "@/hooks/use-article";

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: BrandColors.white,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
  },
  heroSection: {
    backgroundColor: BrandColors.azure,
    paddingTop: 104,
    paddingBottom: 160,
  },
  heroContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 64,
  },
  heroContentStacked: {
    flexDirection: "column-reverse",
    gap: 32,
  },
  heroText: {
    flex: 1,
    gap: 24,
  },
  heroTextStacked: {
    flex: undefined,
    width: "100%",
  },
  tag: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: BrandColors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  tagText: {
    color: BrandColors.white,
    fontFamily: BrandFonts.body,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontFamily: BrandFonts.heading,
    fontSize: 94,
    color: BrandColors.white,
    lineHeight: 80,
  },
  heroTitleStacked: {
    fontSize: 48,
    lineHeight: 44,
  },
  heroImageContainer: {
    width: 670,
    height: 440,
    borderRadius: 8,
    overflow: "hidden",
  },
  heroImageStacked: {
    width: "100%",
    height: undefined,
    aspectRatio: 670 / 440,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  contentSection: {
    backgroundColor: BrandColors.white,
    alignItems: "center",
    paddingVertical: 104,
    paddingHorizontal: 24,
  },
  contentInner: {
    maxWidth: 728,
    width: "100%",
    gap: 20,
  },
  introduction: {
    fontFamily: BrandFonts.body,
    fontSize: 24,
    fontWeight: "600",
    color: BrandColors.gray,
    lineHeight: 36,
  },
});

export default function ArticleDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: article, isLoading } = useArticle(id);
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  if (isLoading) {
    return (
      <WebLayout>
        <View style={styles.loadingContainer}>
          <Loader />
        </View>
      </WebLayout>
    );
  }

  if (!article?.elements) {
    return (
      <WebLayout>
        <Container>
          <View style={styles.contentSection}>
            <Text style={styles.heroTitle}>Article not found</Text>
          </View>
        </Container>
      </WebLayout>
    );
  }

  const { title, introduction, image, article_type, body_copy } = article.elements;
  const imageUrl = image?.value?.[0]?.url;
  const articleTypeName = article_type?.value?.[0]?.name ?? "Article";

  return (
    <WebLayout>
      <View style={styles.heroSection}>
        <Container>
          <View style={[styles.heroContent, !isWide && styles.heroContentStacked]}>
            <View style={[styles.heroText, !isWide && styles.heroTextStacked]}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{articleTypeName}</Text>
              </View>
              {!!title?.value && (
                <Text style={[styles.heroTitle, !isWide && styles.heroTitleStacked]}>
                  {title.value}
                </Text>
              )}
            </View>
            {!!imageUrl && (
              <View style={[styles.heroImageContainer, !isWide && styles.heroImageStacked]}>
                <Image source={{ uri: imageUrl }} style={styles.heroImage} contentFit="cover" />
              </View>
            )}
          </View>
        </Container>
      </View>
      <View style={styles.contentSection}>
        <View style={styles.contentInner}>
          {!!introduction?.value && <Text style={styles.introduction}>{introduction.value}</Text>}
          {!!body_copy?.value && (
            <RichText value={body_copy.value} linkedItems={body_copy.linkedItems} />
          )}
        </View>
      </View>
    </WebLayout>
  );
}
