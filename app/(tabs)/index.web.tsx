import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "@/components/Container/Container";
import { FeaturedArticle } from "@/components/FeaturedArticle/FeaturedArticle";
import { HeroImage } from "@/components/HeroImage/HeroImage";
import { Loader } from "@/components/Loader";
import { RichText } from "@/components/RichText";
import { WebLayout } from "@/components/WebLayout/WebLayout";
import { BrandColors, BrandFonts } from "@/constants/theme";
import { useArticles } from "@/hooks/use-articles";
import { useBanner } from "@/hooks/use-banner";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BrandColors.white,
  },
  sectionSubtitle: {
    fontFamily: BrandFonts.body,
    fontSize: 22,
    color: BrandColors.burgundy,
    textAlign: "left",
  },
  contentSection: {
    gap: 32,
    paddingVertical: 64,
  },
  webContent: {
    gap: 0,
  },
  cremeSection: {
    backgroundColor: BrandColors.creme,
    width: "100%",
  },
});

const HomeScreen = () => {
  const router = useRouter();
  const { data: banner, isLoading: isBannerLoading } = useBanner();
  const { data: articles, isLoading: isArticlesLoading } = useArticles();

  const isLoading = isBannerLoading || isArticlesLoading;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={["top"]}>
        <Loader />
      </SafeAreaView>
    );
  }

  const heroImageUrl = banner?.elements.image.value[0]?.url;
  const featuredArticle = articles?.[0];

  return (
    <WebLayout>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.webContent}>
          {!!banner && !!heroImageUrl && (
            <Container>
              <View style={styles.contentSection}>
                <HeroImage headline={banner.elements.headline.value ?? ""} imageUrl={heroImageUrl}>
                  {!!banner.elements.body.value && <RichText value={banner.elements.body.value} />}
                </HeroImage>
              </View>
            </Container>
          )}

          {!!featuredArticle && (
            <View style={styles.cremeSection}>
              <Container>
                <View style={styles.contentSection}>
                  <FeaturedArticle
                    article={featuredArticle}
                    onReadMore={() => router.push(`/article/${featuredArticle.system.id}`)}
                  />
                </View>
              </Container>
            </View>
          )}
        </View>
      </SafeAreaView>
    </WebLayout>
  );
};

export default HomeScreen;
