import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import PacksScreen from '../components/PurchaseScreen';
import { theme } from '../theme';
import HomeStackNavigator from './HomeStack';
import FavStackNavigator from './FavNavigation';

const Tab = createBottomTabNavigator();

const HIDDEN_ROUTES = ['GenerateCaptions', 'Settings', 'ResultScreen', 'CaptionDetails'];

const shouldHideTabBar = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  return HIDDEN_ROUTES.includes(routeName);
};
const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const hideTab = shouldHideTabBar(route);
        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: hideTab ? { display: 'none' } : {
            height: 50,
            backgroundColor: theme.colors.white,
            elevation: 10,
          },
          tabBarIcon: ({ focused }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Favorites':
                iconName = 'heart';
                break;
              case 'Packs':
                iconName = 'layers';
                break;
              case 'Profile':
                iconName = 'user';
                break;
              default:
                iconName = 'circle';
            }

            return (
              <Icon
                name={iconName}
                size={22}
                color={focused ? '#7C3AED' : '#A0A0A0'}
              />
            );
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Favorites" component={FavStackNavigator} />
      {/* <Tab.Screen name="Packs" component={PacksScreen} /> */}
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default Navigation;
