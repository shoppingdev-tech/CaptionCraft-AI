import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import BootSplash from "react-native-bootsplash";
import Main from './src';
import mobileAds from 'react-native-google-mobile-ads';
import { showAppOpenAd } from './src/AppOpenAdManager';
import './src/i18n';
import { logErrorToFirestore } from './src/redux/errorApi';

const App = () => {
  useEffect(async() => {
    BootSplash.hide({ fade: true });
    try {
        mobileAds()
          .initialize()
          .then(adapterStatuses => {
            showAppOpenAd();
          });

    } catch (error) {
      await logErrorToFirestore('AdMob initialization error', JSON.stringify(error));

      console.log('AdMob initialization error:', error);
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <Main />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
