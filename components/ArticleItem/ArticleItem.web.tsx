import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";
import type { ArticleType } from "@/model/index";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 64,
    paddingTop: 98,
    paddingBottom: 150,
  },
  imageContainer: {
    width: 440,
    height: 288,
    borderRadius: 6,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 2,
    justifyContent: "center",
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
  introduction: {
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

  const { title, introduction, image, publish_date } = article.elements;
  const imageUrl = image?.value?.[0]?.url;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!!imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" />}
      </View>
      <View style={styles.content}>
        {!!title?.value && <Text style={styles.title}>{title.value}</Text>}
        {!!publish_date?.value && <Text style={styles.date}>{formatDate(publish_date.value)}</Text>}
        {!!introduction?.value && (
          <Text style={styles.introduction} numberOfLines={4}>
            {introduction.value}
          </Text>
        )}
        <Pressable style={styles.readMore} onPress={onReadMore}>
          <Text style={styles.readMoreText}>Read more</Text>
        </Pressable>
      </View>
    </View>
  );
};
