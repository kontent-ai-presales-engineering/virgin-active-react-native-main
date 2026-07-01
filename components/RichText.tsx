import type { IContentItem } from "@kontent-ai/delivery-sdk";
import {
  type PortableTextComponentOrItem,
  type PortableTextExternalLink,
  type PortableTextImage,
  transformToPortableText,
} from "@kontent-ai/rich-text-resolver";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponent,
  type PortableTextTypeComponent,
} from "@portabletext/react-native";
import { Image } from "expo-image";
import { useMemo } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/theme";
import { isCallToActionType, isDisclaimerType } from "@/model/index";
import { Callout } from "./Callout/Callout";
import { CallToAction } from "./CallToAction/CallToAction";

type RichTextProps = {
  readonly value: string;
  readonly linkedItems?: ReadonlyArray<IContentItem>;
};

const styles = StyleSheet.create({
  paragraph: {
    fontFamily: BrandFonts.body,
    fontSize: 20,
    color: BrandColors.gray,
    lineHeight: 30,
    marginBottom: 16,
  },
  h1: {
    fontFamily: BrandFonts.heading,
    fontSize: 48,
    color: BrandColors.gray,
    marginBottom: 24,
    lineHeight: 40,
  },
  h2: {
    fontFamily: BrandFonts.heading,
    fontSize: 36,
    color: BrandColors.gray,
    marginBottom: 20,
    lineHeight: 30,
  },
  h3: {
    fontFamily: BrandFonts.heading,
    fontSize: 20,
    color: BrandColors.gray,
    marginBottom: 16,
    lineHeight: 17,
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  link: { color: BrandColors.azure, textDecorationLine: "underline" },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: BrandColors.burgundy,
    paddingLeft: 12,
    marginVertical: 12,
  },
  blockquoteText: {
    fontStyle: "italic",
    color: BrandColors.grayLight,
  },
  list: { marginVertical: 8 },
  listItem: { flexDirection: "row", marginBottom: 4 },
  bullet: { width: 20, color: BrandColors.gray },
  listItemText: {
    flex: 1,
    fontFamily: BrandFonts.body,
    fontSize: 20,
    color: BrandColors.gray,
    lineHeight: 30,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginVertical: 16,
  },
  richTextImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  componentWrapper: {
    marginVertical: 0,
  },
});

const createComponents = (
  linkedItems: ReadonlyArray<IContentItem>,
  ctaIndexMap: Map<string, number>,
): PortableTextComponents => ({
  block: {
    normal: ({ children }) => <Text style={styles.paragraph}>{children}</Text>,
    h1: ({ children }) => <Text style={styles.h1}>{children}</Text>,
    h2: ({ children }) => <Text style={styles.h2}>{children}</Text>,
    h3: ({ children }) => <Text style={styles.h3}>{children}</Text>,
    blockquote: ({ children }) => (
      <View style={styles.blockquote}>
        <Text style={styles.blockquoteText}>{children}</Text>
      </View>
    ),
  },
  marks: {
    strong: ({ children }) => <Text style={styles.bold}>{children}</Text>,
    em: ({ children }) => <Text style={styles.italic}>{children}</Text>,
    link: (({ value, children }) => (
      <Text
        style={styles.link}
        onPress={() => {
          if (value?.href) {
            void Linking.openURL(value.href);
          }
        }}
      >
        {children}
      </Text>
    )) as PortableTextMarkComponent<PortableTextExternalLink>,
  },
  list: {
    bullet: ({ children }) => <View style={styles.list}>{children}</View>,
    number: ({ children }) => <View style={styles.list}>{children}</View>,
  },
  listItem: {
    bullet: ({ children }) => (
      <View style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.listItemText}>{children}</Text>
      </View>
    ),
    number: ({ children, index }) => (
      <View style={styles.listItem}>
        <Text style={styles.bullet}>{(index ?? 0) + 1}.</Text>
        <Text style={styles.listItemText}>{children}</Text>
      </View>
    ),
  },
  types: {
    image: (({ value }) => {
      const url = value?.asset?.url;
      if (!url) {
        return null;
      }

      return (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: url }} style={styles.richTextImage} contentFit="cover" />
        </View>
      );
    }) as PortableTextTypeComponent<PortableTextImage>,
    componentOrItem: (({ value }) => {
      const item = linkedItems.find((i) => i.system.codename === value.componentOrItem._ref);
      if (!item) {
        return null;
      }

      if (isDisclaimerType(item)) {
        return (
          <View style={styles.componentWrapper}>
            <Callout title={item.elements.headline.value} body={item.elements.subheadline.value} />
          </View>
        );
      }

      if (isCallToActionType(item)) {
        const ctaIndex = ctaIndexMap.get(item.system.codename) ?? 0;
        return (
          <View style={styles.componentWrapper}>
            <CallToAction
              title={item.elements.headline.value}
              description={item.elements.subheadline.value}
              buttonText={item.elements.button_label.value}
              buttonUrl={item.elements.button_link.linkedItems[0]?.elements.url?.value ?? ""}
              imageUrl={item.elements.image.value[0]?.url}
              imagePosition={ctaIndex % 2 === 0 ? "right" : "left"}
            />
          </View>
        );
      }

      return null;
    }) as PortableTextTypeComponent<PortableTextComponentOrItem>,
  },
});

export const RichText = ({ value, linkedItems = [] }: RichTextProps) => {
  const portableText = useMemo(() => transformToPortableText(value), [value]);

  const ctaIndexMap = useMemo(() => {
    const ctaItems = linkedItems.filter(isCallToActionType);
    return new Map(ctaItems.map((item, index) => [item.system.codename, index]));
  }, [linkedItems]);

  const components = useMemo(
    () => createComponents(linkedItems, ctaIndexMap),
    [linkedItems, ctaIndexMap],
  );

  return <PortableText value={portableText} components={components} />;
};
