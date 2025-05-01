// src/navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/login';
import SignupScreen from '../components/signup';
import ForgotPasswordScreen from '../components/forget';
import OTPScreen from '../components/otp';
const Stack = createNativeStackNavigator();

const VerifyStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Verify" component={OTPScreen} />
    </Stack.Navigator>
  );
};

export default VerifyStackNavigator;
