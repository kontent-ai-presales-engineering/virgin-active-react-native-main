import {
  AbhayaLibre_400Regular,
  AbhayaLibre_500Medium,
  AbhayaLibre_600SemiBold,
  AbhayaLibre_700Bold,
  AbhayaLibre_800ExtraBold,
  useFonts as useAbhayaLibre,
} from "@expo-google-fonts/abhaya-libre";

import {
  SourceSans3_400Regular,
  SourceSans3_600SemiBold,
  SourceSans3_700Bold,
  useFonts as useSourceSans3,
} from "@expo-google-fonts/source-sans-3";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "react-native";
import { PreviewModeProvider } from "@/providers/preview-mode-provider";
import { QueryProvider } from "@/providers/query-provider";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [abhayaLoaded] = useAbhayaLibre({
    AbhayaLibre_400Regular,
    AbhayaLibre_500Medium,
    AbhayaLibre_600SemiBold,
    AbhayaLibre_700Bold,
    AbhayaLibre_800ExtraBold,
  });

  const [sourceSansLoaded] = useSourceSans3({
    SourceSans3_400Regular,
    SourceSans3_600SemiBold,
    SourceSans3_700Bold,
  });

  if (!abhayaLoaded || !sourceSansLoaded) {
    return null;
  }

  return (
    <QueryProvider>
      <PreviewModeProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="article/[id]" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PreviewModeProvider>
    </QueryProvider>
  );
}
