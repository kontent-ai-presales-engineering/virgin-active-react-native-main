import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  textContainer: {
    gap: 8,
  },
  headline: {
    fontFamily: BrandFonts.heading,
    fontSize: 36,
    color: BrandColors.burgundy,
    lineHeight: 44,
  },
  subheadline: {
    fontFamily: BrandFonts.body,
    fontSize: 18,
    color: BrandColors.gray,
    lineHeight: 28,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 670 / 440,
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

export const HeroImage = ({ headline, subheadline, imageUrl }: HeroImageProps) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.subheadline}>{subheadline}</Text>
    </View>
    <View style={styles.imageContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" />
    </View>
  </View>
);
