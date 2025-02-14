import { GameHistoryProvider } from '@/contexts/game-history-context';
import colors from '@/utils/colors';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GameHistoryProvider>
      <Stack
        screenOptions={{
          orientation: 'portrait_down',
        }}>
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="game"
          options={{
            title: '',
            headerShown: true,
            headerTransparent: true,
            headerTintColor: colors.lightGreen,
            headerBackTitle: 'Exit Game',
            headerStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />
        <Stack.Screen
          name="game-history"
          options={{
            title: '',
            headerShown: true,
            headerTransparent: true,
            headerTintColor: colors.lightGreen,
            headerBackTitle: 'Exit Game',
            headerStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </GameHistoryProvider>
  );
}
