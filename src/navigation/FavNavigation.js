// src/navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen';
import FavouritesScreen from '../components/FavouritesScreen';
import CaptionDetailsScreen from '../components/CaptionDetails';
const Stack = createNativeStackNavigator();

const FavStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorites" component={FavouritesScreen} />
      <Stack.Screen name="CaptionDetails" component={CaptionDetailsScreen} />
    </Stack.Navigator>
  );
};

export default FavStackNavigator;
