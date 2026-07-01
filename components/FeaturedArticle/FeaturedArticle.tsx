import { Pressable, StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";
import type { ArticleType } from "@/model/index";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 24,
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
  content: {
    gap: 8,
  },
  title: {
    fontFamily: BrandFonts.heading,
    fontSize: 28,
    color: BrandColors.burgundy,
    lineHeight: 36,
  },
  date: {
    fontFamily: BrandFonts.body,
    fontSize: 14,
    color: BrandColors.grayLight,
  },
  perex: {
    fontFamily: BrandFonts.body,
    fontSize: 16,
    color: BrandColors.gray,
    lineHeight: 24,
  },
  readMore: {
    alignSelf: "flex-start",
  },
  readMoreText: {
    fontFamily: BrandFonts.body,
    fontSize: 16,
    color: BrandColors.burgundy,
    textDecorationLine: "underline",
  },
});

type FeaturedArticleProps = {
  readonly article: ArticleType;
  readonly onReadMore: () => void;
};

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const FeaturedArticle = ({ article, onReadMore }: FeaturedArticleProps) => {
  if (!article.elements) {
    return null;
  }

  const { title, perex, published_date } = article.elements;

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>FEATURED ARTICLE</Text>
      </View>
      <View style={styles.content}>
        {!!title?.value && <Text style={styles.title}>{title.value}</Text>}
        {!!published_date?.value && (
          <Text style={styles.date}>{formatDate(published_date.value)}</Text>
        )}
        {!!perex?.value && <Text style={styles.perex}>{perex.value}</Text>}
        <Pressable style={styles.readMore} onPress={onReadMore}>
          <Text style={styles.readMoreText}>Read more</Text>
        </Pressable>
      </View>
    </View>
  );
};
