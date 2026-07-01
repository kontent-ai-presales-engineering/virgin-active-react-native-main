import { Pressable, StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";
import type { ArticleType } from "@/model/index";

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 104,
  },
  container: {
    gap: 20,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: BrandColors.azure,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  badgeText: {
    color: BrandColors.white,
    fontFamily: BrandFonts.body,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: BrandFonts.heading,
    fontSize: 48,
    color: BrandColors.burgundy,
    lineHeight: 40,
    fontWeight: "600",
  },
  date: {
    fontFamily: BrandFonts.body,
    fontSize: 18,
    color: BrandColors.grayLight,
    marginTop: 24,
    lineHeight: 27,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  tag: {
    borderWidth: 1,
    borderColor: BrandColors.grayDark,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tagText: {
    fontFamily: BrandFonts.body,
    fontSize: 12,
    fontWeight: "600",
    color: BrandColors.grayDark,
    textTransform: "uppercase",
    lineHeight: 18,
  },
  perex: {
    fontFamily: BrandFonts.body,
    fontSize: 20,
    color: BrandColors.gray,
    lineHeight: 30,
    marginTop: 16,
  },
  readMore: {
    alignSelf: "flex-start",
    marginTop: 24,
  },
  readMoreText: {
    fontFamily: BrandFonts.body,
    fontSize: 20,
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
  return `Published on ${date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}`;
};

export const FeaturedArticle = ({ article, onReadMore }: FeaturedArticleProps) => {
  if (!article.elements) {
    return null;
  }

  const { title, perex, published_date, tags: tagsElement } = article.elements;
  const tags = tagsElement?.value ?? [];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>FEATURED ARTICLE</Text>
        </View>
        <View style={styles.content}>
          {!!title?.value && <Text style={styles.title}>{title.value}</Text>}
          {!!published_date?.value && (
            <Text style={styles.date}>{formatDate(published_date.value)}</Text>
          )}
          {tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {tags.map((tag) => (
                <View key={tag.codename} style={styles.tag}>
                  <Text style={styles.tagText}>{tag.name}</Text>
                </View>
              ))}
            </View>
          )}
          {!!perex?.value && <Text style={styles.perex}>{perex.value}</Text>}
          <Pressable style={styles.readMore} onPress={onReadMore}>
            <Text style={styles.readMoreText}>Read more</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
