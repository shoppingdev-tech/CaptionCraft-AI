import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
// import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './src/navigation/Navigation';
import { store, persistor } from './src/redux/store';
// import './src/i18n';
import BootSplash from "react-native-bootsplash";
import Main from './src';

const App = () => {
  // const { t } = useTranslation();

  useEffect(() => {
    BootSplash.hide({ fade: true })
    console.log('App mounted');
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
