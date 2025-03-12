import { useAuth } from "@/context/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";

export default function Layout() {

  const { token, initialized } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[1] === '(tabs)';
    if (token && !inAuthGroup) {
      router.replace('/(app)/(tabs)');
    } else if (!token && inAuthGroup) {
      router.replace('/(app)/(auth)/login');
    }
  }, [token, initialized]);

  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: '#fff'
      },
    }}>
      <Stack.Screen name='(auth)/login' options={{
        title: 'Log In',
        contentStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }
      }} />
      <Stack.Screen
        name='(auth)/pass'
        options={{
          presentation: 'formSheet',
        }}
      />
    </Stack>
  );
}

