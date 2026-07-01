import { Image } from "expo-image";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  textContainer: {
    gap: 8,
  },
  textContainerWide: {
    flex: 1,
    paddingRight: 24,
  },
  title: {
    fontFamily: BrandFonts.heading,
    fontSize: 36,
    fontStyle: "normal",
    color: BrandColors.azure,
    lineHeight: 44,
  },
  body: {
    fontFamily: BrandFonts.body,
    fontSize: 18,
    color: BrandColors.gray,
    lineHeight: 28,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 670 / 440,
  },
  imageContainerWide: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

type OurTeamProps = {
  readonly title: string;
  readonly body: string;
  readonly imageUrl: string;
};

export const OurTeam = ({ title, body, imageUrl }: OurTeamProps) => {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  return (
    <View style={[styles.container, isWide ? styles.row : styles.column]}>
      <View style={[styles.textContainer, isWide && styles.textContainerWide]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
      <View style={[styles.imageContainer, isWide && styles.imageContainerWide]}>
        <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" />
      </View>
    </View>
  );
};
