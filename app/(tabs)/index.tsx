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
import { useArticles } from "@/hooks/use-articles";
import { useBanner } from "@/hooks/use-banner";

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
  const {
    data: banner,
    isLoading: isBannerLoading,
    refetch: refetchBanner,
    isRefetching: isRefetchingBanner,
  } = useBanner();
  const {
    data: articles,
    isLoading: isArticlesLoading,
    refetch: refetchArticles,
    isRefetching: isRefetchingArticles,
  } = useArticles();

  const isLoading = isBannerLoading || isArticlesLoading;
  const isRefetching = isRefetchingBanner || isRefetchingArticles;
  const refetch = () => {
    void refetchBanner();
    void refetchArticles();
  };

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
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      >
        <View style={styles.headerSection}>
          <Logo />
          {!!banner && !!heroImageUrl && (
            <HeroImage headline={banner.elements.headline.value ?? ""} imageUrl={heroImageUrl}>
              {!!banner.elements.body.value && <RichText value={banner.elements.body.value} />}
            </HeroImage>
          )}
        </View>

        {!!featuredArticle && (
          <>
            <Divider />
            <View style={styles.contentSection}>
              <Text style={styles.sectionSubtitle}>Featured</Text>
              <FeaturedArticle
                article={featuredArticle}
                onReadMore={() => router.push(`/article/${featuredArticle.system.id}`)}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
