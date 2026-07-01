import { Pressable, StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";
import type { ArticleType } from "@/model/index";

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 48,
    gap: 20,
  },
  title: {
    fontFamily: BrandFonts.heading,
    fontSize: 36,
    color: BrandColors.burgundy,
    lineHeight: 44,
  },
  date: {
    fontFamily: BrandFonts.body,
    fontSize: 14,
    color: BrandColors.grayLight,
  },
  perex: {
    fontFamily: BrandFonts.body,
    fontSize: 20,
    color: BrandColors.gray,
    lineHeight: 30,
  },
  readMore: {
    alignSelf: "flex-start",
  },
  readMoreText: {
    fontFamily: BrandFonts.body,
    fontSize: 20,
    color: BrandColors.burgundy,
    textDecorationLine: "underline",
  },
});

type ArticleItemProps = {
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

export const ArticleItem = ({ article, onReadMore }: ArticleItemProps) => {
  if (!article.elements) {
    return null;
  }

  const { title, perex, published_date } = article.elements;

  return (
    <View style={styles.container}>
      {!!title?.value && <Text style={styles.title}>{title.value}</Text>}
      {!!published_date?.value && (
        <Text style={styles.date}>{formatDate(published_date.value)}</Text>
      )}
      {!!perex?.value && (
        <Text style={styles.perex} numberOfLines={4}>
          {perex.value}
        </Text>
      )}
      <Pressable style={styles.readMore} onPress={onReadMore}>
        <Text style={styles.readMoreText}>Read more</Text>
      </Pressable>
    </View>
  );
};
