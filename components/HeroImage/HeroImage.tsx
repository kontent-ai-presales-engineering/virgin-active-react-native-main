import { Image } from "expo-image";
import type { ReactNode } from "react";
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
  readonly imageUrl: string;
  readonly children?: ReactNode;
};

export const HeroImage = ({ headline, imageUrl, children }: HeroImageProps) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.headline}>{headline}</Text>
      {children}
    </View>
    <View style={styles.imageContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" />
    </View>
  </View>
);
