import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RichText } from "@/components/RichText";
import { BrandColors, BrandFonts } from "@/constants/theme";
import type { FaqType } from "@/model/index";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: BrandColors.grayLight,
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  question: {
    flex: 1,
    fontFamily: BrandFonts.heading,
    fontSize: 20,
    color: BrandColors.burgundy,
  },
  toggle: {
    fontFamily: BrandFonts.body,
    fontSize: 20,
    color: BrandColors.azure,
  },
  answer: {
    marginTop: 12,
  },
});

type FaqItemProps = {
  readonly faq: FaqType;
};

export const FaqItem = ({ faq }: FaqItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { question, answer } = faq.elements;

  return (
    <View style={styles.container}>
      <Pressable style={styles.questionRow} onPress={() => setIsExpanded((prev) => !prev)}>
        {!!question?.value && <Text style={styles.question}>{question.value}</Text>}
        <Text style={styles.toggle}>{isExpanded ? "−" : "+"}</Text>
      </Pressable>
      {isExpanded && !!answer?.value && (
        <View style={styles.answer}>
          <RichText value={answer.value} />
        </View>
      )}
    </View>
  );
};
