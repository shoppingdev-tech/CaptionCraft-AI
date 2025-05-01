import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';

import AuthNavigation from './navigation/AuthNavigation';
import AppNavigation from './navigation/Navigation';
import { setUserFromFirebase } from './redux/slices/authSlice';
import { fetchCurrentDetails, logout } from './redux/thunk/auth';
import VerifyStackNavigator from './navigation/VerifyUser';
import CustomToast from './components/toast';

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        dispatch(fetchCurrentDetails({uid: firebaseUser.uid}));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <NavigationContainer>
      {user ? user?.isVerified ? <AppNavigation /> : <VerifyStackNavigator /> : <AuthNavigation />}
      <Toast
        position="bottom"
        config={{
          success: (props) => <CustomToast {...props} type="success" />,
          error: (props) => <CustomToast {...props} type="error" />,
          info: (props) => <CustomToast {...props} type="info" />,
        }}
      />
    </NavigationContainer>
  );
};

export default Main;
