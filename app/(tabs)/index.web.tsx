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
import { useLandingPage } from "@/hooks/use-landing-page";
import { isArticleType } from "@/model/index";

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
  const { data: landingPage, isLoading } = useLandingPage();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={["top"]}>
        <Loader />
      </SafeAreaView>
    );
  }

  const heroImageUrl = landingPage?.elements.hero_image.value[0]?.url;
  const featuredContent = landingPage?.elements.featured_content.linkedItems ?? [];
  const firstArticle = featuredContent.find(isArticleType);

  return (
    <WebLayout>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.webContent}>
          {!!landingPage && !!heroImageUrl && (
            <HeroImage
              headline={landingPage.elements.headline.value}
              subheadline={landingPage.elements.subheadline.value}
              imageUrl={heroImageUrl}
            />
          )}

          <Container>
            <View style={styles.contentSection}>
              {!!landingPage?.elements.body_copy.value && (
                <RichText
                  value={landingPage.elements.body_copy.value}
                  linkedItems={landingPage.elements.body_copy.linkedItems}
                />
              )}
            </View>
          </Container>

          {!!firstArticle && (
            <View style={styles.cremeSection}>
              <Container>
                <FeaturedArticle
                  article={firstArticle}
                  onReadMore={() => router.push(`/article/${firstArticle.system.id}`)}
                />
              </Container>
            </View>
          )}
        </View>
      </SafeAreaView>
    </WebLayout>
  );
};

export default HomeScreen;
