// src/navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

import HomeScreen from '../components/HomeScreen';
import ResultScreen from '../components/ResultScreen';
import CaptionDetailsScreen from '../components/CaptionDetails';
import GenerateCaptionScreen from '../components/GenerateCaptions';
import SettingsScreen from '../components/Setting';
import ChangeLanguageScreen from '../components/ChangeLanguage';
import FavouritesScreen from '../components/FavouritesScreen';
const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      gestureEnabled: true,
    }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="GenerateCaptions" component={GenerateCaptionScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="CaptionDetails" component={CaptionDetailsScreen} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
