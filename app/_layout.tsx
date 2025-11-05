import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import './global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'JosefinSans-Regular': require('../assets/fonts/Josefin_Sans/static/JosefinSans-Regular.ttf'),
    'JosefinSans-SemiBold': require('../assets/fonts/Josefin_Sans/static/JosefinSans-SemiBold.ttf'),
  });

  // apply default font family to all Text components once fonts are ready
  if (fontsLoaded) {
    const t = Text as any;
    if (!t.defaultProps) t.defaultProps = {};
    // merge existing styles but prefer Josefin for family
    const existing = t.defaultProps.style || {};
    t.defaultProps.style = [existing, { fontFamily: 'JosefinSans-Regular' }];
  }

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
