// src/navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/login';
import SignupScreen from '../components/signup';
import ForgotPasswordScreen from '../components/forget';
import OTPScreen from '../components/otp';
import HomeScreen from '../components/HomeScreen';
import ResultScreen from '../components/ResultScreen';
import CaptionDetailsScreen from '../components/CaptionDetails';
import GenerateCaptionScreen from '../components/GenerateCaptions';
import SettingsScreen from '../components/Setting';
const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="GenerateCaptions" component={GenerateCaptionScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="CaptionDetails" component={CaptionDetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
