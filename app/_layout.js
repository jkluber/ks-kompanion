import { Stack } from "expo-router";
import {useFonts} from 'expo-font';
import { ActivityIndicator, StatusBar } from "react-native";
import React, { useState, useEffect} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import RunescapeText from './src/components/RunescapeText'; // Adjust the path as necessary


export default function RootLayout() {

  const [fontsLoaded] = useFonts({
       'RunescapeThin': require('../assets/fonts/RuneScape-Plain-11.ttf'),
       'RunescapeBold': require('../assets/fonts/RuneScape-Bold-12.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#00ff00" />
          <RunescapeText 
            style={{
                fontSize: 24,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                textAlign: 'center',
            }}
            font="RunescapeBold">
            The Klubescroll companion app is now loading...
          </RunescapeText>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  return  (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
