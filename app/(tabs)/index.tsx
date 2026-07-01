import { useRouter } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "@/components/Divider";
import { FeaturedArticle } from "@/components/FeaturedArticle/FeaturedArticle";
import { HeroImage } from "@/components/HeroImage/HeroImage";
import { Loader } from "@/components/Loader";
import { Logo } from "@/components/Logo";
import { RichText } from "@/components/RichText";
import { BrandColors, BrandFonts } from "@/constants/theme";
import { useLandingPage } from "@/hooks/use-landing-page";
import { isArticleType } from "@/model/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  scrollContent: {
    padding: 24,
    gap: 32,
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
  headerSection: {
    gap: 16,
  },
  contentSection: {
    gap: 32,
    paddingVertical: 32,
  },
});

const HomeScreen = () => {
  const router = useRouter();
  const { data: landingPage, isLoading, refetch, isRefetching } = useLandingPage();

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
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      >
        <View style={styles.headerSection}>
          <Logo />
          {!!landingPage && !!heroImageUrl && (
            <HeroImage
              headline={landingPage.elements.headline.value}
              subheadline={landingPage.elements.subheadline.value}
              imageUrl={heroImageUrl}
            />
          )}
        </View>

        <View style={styles.contentSection}>
          {!!landingPage?.elements.body_copy.value && (
            <>
              <RichText
                value={landingPage.elements.body_copy.value}
                linkedItems={landingPage.elements.body_copy.linkedItems}
              />
              <Divider />
            </>
          )}

          {!!firstArticle && (
            <>
              <Text style={styles.sectionSubtitle}>Featured</Text>
              <FeaturedArticle
                article={firstArticle}
                onReadMore={() => router.push(`/article/${firstArticle.system.id}`)}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
