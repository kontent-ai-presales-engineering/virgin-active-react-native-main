import { StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";
import type { ArticleType } from "@/model/index";
import { ArticleItem } from "./ArticleItem/ArticleItem";
import { Divider } from "./Divider";

const styles = StyleSheet.create({
  container: {},
  articleWrapper: {
    paddingBottom: 8,
  },
  title: {
    fontFamily: BrandFonts.heading,
    fontSize: 40,
    lineHeight: 48,
    paddingTop: 48,
    color: BrandColors.burgundy,
    textAlign: "left",
  },
});

type ArticlesListProps = {
  readonly title: string;
  readonly articles: readonly ArticleType[];
  readonly onArticlePress: (id: string) => void;
};

export const ArticlesList = ({ title, articles, onArticlePress }: ArticlesListProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {articles.map((article, index) => (
      <View key={article.system.id} style={styles.articleWrapper}>
        <ArticleItem article={article} onReadMore={() => onArticlePress(article.system.id)} />
        {index < articles.length - 1 && <Divider />}
      </View>
    ))}
  </View>
);
