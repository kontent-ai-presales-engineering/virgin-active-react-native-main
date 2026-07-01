import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";

type CallToActionProps = {
  readonly title: string;
  readonly description: string;
  readonly buttonText: string;
  readonly buttonUrl: string;
  readonly imageUrl?: string;
  readonly imagePosition?: "left" | "right";
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 64,
    paddingTop: 96,
    paddingBottom: 160,
  },
  imageContainer: {
    width: 560,
    height: 420,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    gap: 20,
  },
  title: {
    fontFamily: BrandFonts.heading,
    fontSize: 60,
    color: BrandColors.burgundy,
    fontWeight: "700",
  },
  description: {
    fontFamily: BrandFonts.body,
    fontSize: 20,
    color: BrandColors.gray,
    lineHeight: 30,
  },
  button: {
    backgroundColor: BrandColors.azure,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 20,
  },
  buttonText: {
    fontFamily: BrandFonts.body,
    fontSize: 16,
    color: BrandColors.white,
    fontWeight: "600",
  },
});

const getContainerStyle = (imagePosition: "left" | "right"): ViewStyle => ({
  ...styles.container,
  flexDirection: imagePosition === "left" ? "row" : "row-reverse",
});

export const CallToAction = ({
  title,
  description,
  buttonText,
  buttonUrl,
  imageUrl,
  imagePosition = "right",
}: CallToActionProps) => (
  <View style={getContainerStyle(imagePosition)}>
    {!!imageUrl && (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="cover"
          accessibilityLabel={title}
        />
      </View>
    )}
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {!!buttonUrl && (
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      )}
    </View>
  </View>
);
