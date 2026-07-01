import type { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { BrandColors } from "@/constants/theme";
import { Container } from "../Container/Container";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

type WebLayoutProps = {
  readonly children: ReactNode;
};

export const WebLayout = ({ children }: WebLayoutProps) => (
  <ScrollView style={styles.wrapper} contentContainerStyle={styles.scrollContent}>
    <Container>
      <Header />
    </Container>
    {children}
    <Footer />
  </ScrollView>
);
