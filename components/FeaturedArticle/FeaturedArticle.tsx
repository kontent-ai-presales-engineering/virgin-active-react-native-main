import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";
import type { ArticleType } from "@/model/index";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 24,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    aspectRatio: 16 / 9,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 16,
    left: 16,
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
  introduction: {
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

  const { title, introduction, image, publish_date } = article.elements;
  const imageUrl = image?.value?.[0]?.url;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!!imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" />}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>FEATURED ARTICLE</Text>
        </View>
      </View>
      <View style={styles.content}>
        {!!title?.value && <Text style={styles.title}>{title.value}</Text>}
        {!!publish_date?.value && <Text style={styles.date}>{formatDate(publish_date.value)}</Text>}
        {!!introduction?.value && <Text style={styles.introduction}>{introduction.value}</Text>}
        <Pressable style={styles.readMore} onPress={onReadMore}>
          <Text style={styles.readMoreText}>Read more</Text>
        </Pressable>
      </View>
    </View>
  );
};
