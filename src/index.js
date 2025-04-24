import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation/Navigation';
import StackNavigator from './navigation/AuthNavigation';

const Main = () => {

  return (
      <NavigationContainer>
          {/* <StackNavigator /> */}
          <Navigation />
      </NavigationContainer>
  );
};

export default Main;
