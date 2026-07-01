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
    gap: 24,
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
  heroDate: {
    fontFamily: BrandFonts.body,
    fontSize: 14,
    color: BrandColors.white,
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
  perex: {
    fontFamily: BrandFonts.body,
    fontSize: 24,
    fontWeight: "600",
    color: BrandColors.gray,
    lineHeight: 36,
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

  const { title, perex, published_date, body } = article.elements;

  return (
    <WebLayout>
      <View style={styles.heroSection}>
        <Container>
          <View style={styles.heroContent}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Article</Text>
            </View>
            {!!title?.value && (
              <Text style={[styles.heroTitle, !isWide && styles.heroTitleStacked]}>
                {title.value}
              </Text>
            )}
            {!!published_date?.value && (
              <Text style={styles.heroDate}>{formatDate(published_date.value)}</Text>
            )}
          </View>
        </Container>
      </View>
      <View style={styles.contentSection}>
        <View style={styles.contentInner}>
          {!!perex?.value && <Text style={styles.perex}>{perex.value}</Text>}
          {!!body?.value && <RichText value={body.value} />}
        </View>
      </View>
    </WebLayout>
  );
}
