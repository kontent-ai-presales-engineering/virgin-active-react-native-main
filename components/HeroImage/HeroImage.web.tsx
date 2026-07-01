import { Image } from "expo-image";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: BrandColors.burgundy,
    width: "100%",
  },
  container: {
    width: "100%",
    maxWidth: 1536,
    alignSelf: "center",
    paddingHorizontal: 12,
  },
  content: {
    flexDirection: "column",
    paddingVertical: 40,
  },
  contentWide: {
    flexDirection: "row",
    gap: 128,
    paddingVertical: 0,
  },
  textContainer: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    gap: 40,
    alignItems: "center",
  },
  textContainerWide: {
    paddingTop: 104,
    paddingBottom: 160,
    alignItems: "flex-start",
  },
  headline: {
    fontFamily: BrandFonts.heading,
    fontSize: 48,
    color: BrandColors.creme,
    lineHeight: 52,
    textAlign: "center",
  },
  headlineWide: {
    fontSize: 64,
    lineHeight: 64,
    textAlign: "left",
  },
  headlineLarge: {
    fontSize: 94,
    lineHeight: 78,
  },
  subheadline: {
    fontFamily: BrandFonts.body,
    fontSize: 20,
    color: BrandColors.creme,
    lineHeight: 30,
    textAlign: "center",
  },
  subheadlineWide: {
    textAlign: "left",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 660 / 770,
  },
  imageContainerWide: {
    flex: 1,
    aspectRatio: undefined,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

type HeroImageProps = {
  readonly headline: string;
  readonly subheadline: string;
  readonly imageUrl: string;
};

export const HeroImage = ({ headline, subheadline, imageUrl }: HeroImageProps) => {
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;
  const isExtraWide = width >= 1280;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={[styles.content, isWide && styles.contentWide]}>
          <View style={[styles.textContainer, isWide && styles.textContainerWide]}>
            <Text
              style={[
                styles.headline,
                isWide && styles.headlineWide,
                isExtraWide && styles.headlineLarge,
              ]}
            >
              {headline}
            </Text>
            <Text style={[styles.subheadline, isWide && styles.subheadlineWide]}>
              {subheadline}
            </Text>
          </View>
          <View style={[styles.imageContainer, isWide && styles.imageContainerWide]}>
            <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" />
          </View>
        </View>
      </View>
    </View>
  );
};
