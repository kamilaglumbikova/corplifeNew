import { useFonts } from 'expo-font';
import { Slot, Redirect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '@/components/SplashScreen';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Toast, { BaseToast, ToastConfig } from 'react-native-toast-message';
import SuccessToast from '@/components/SuccessToast';
import ErrorToast from '@/components/ErrorToast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const toastConfig = {
  successCustomToast: ({ text1 }: { text1: string }) => (
    <SuccessToast text1={text1} />
  ),
  errorCustomToast: ({ text1 }: { text1: string }) => (
    <ErrorToast text1={text1} />
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    }
  }
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  });
  const [isReady, setIsReady] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAppState = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        const userData = await AsyncStorage.getItem('userInfo');

        if (hasLaunched === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setInitialRoute('/info');
        } else if (userData) {
          setInitialRoute('/(app)/(tabs)');
        } else {
          setInitialRoute('/(app)/(auth)/login');
        }
        setIsReady(true);
      } catch (error) {
        console.error('App state check failed', error);
        setInitialRoute('/(app)/(auth)/login');
      } finally {
        setAppReady(true);
      }
    };
    checkAppState();
  }, []);

  if (!isReady) {
    return <SplashScreen onFinish={() => setTimeout(() => setIsReady(true), 0)}  />;
  }

  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {initialRoute && <Redirect href={initialRoute as any} />}
          <Slot />
          <StatusBar barStyle="dark-content" />
          <Toast config={toastConfig as ToastConfig} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );

}
