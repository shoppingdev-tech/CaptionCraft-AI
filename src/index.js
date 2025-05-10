import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import i18n from './i18n';
import DeviceInfo from 'react-native-device-info';
import UpdateModal from './screen/checkAppVersion';

import CustomToast from './components/toast';
import HomeStackNavigator from './navigation/HomeStack';

const Main = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.auth);
  const prevLang = useRef();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Update i18n language when Redux language changes
  useEffect(() => {
    if (language && language !== prevLang.current) {
      i18n.changeLanguage(language);
      prevLang.current = language;
    }
  }, [language]);

  useEffect(() => {
    const checkAppVersion = async () => {
      try {
        const versionDoc = await firestore()
          .collection('appVersionCheck')
          .doc('app')
          .get();
        const versionData = versionDoc.data();
        const minVersion = versionData?.version;
        const currentVersion = DeviceInfo.getVersion();
        // Compare versions (assume format 'x.y.z')
        const isLower = (a, b) => {
          const pa = a.split('.').map(Number);
          const pb = b.split('.').map(Number);
          for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            if ((pa[i] || 0) < (pb[i] || 0)) return true;
            if ((pa[i] || 0) > (pb[i] || 0)) return false;
          }
          return false;
        };
        if (minVersion && isLower(currentVersion, minVersion)) {
          setShowUpdateModal(true);
        }
      } catch (e) {
        // Optionally handle error
      }
    };
    checkAppVersion();
  }, []);

  return (
    <>
      <NavigationContainer>
        {<HomeStackNavigator />}
        <Toast
          position="bottom"
          config={{
            success: (props) => <CustomToast {...props} type="success" />,
            error: (props) => <CustomToast {...props} type="error" />,
            info: (props) => <CustomToast {...props} type="info" />,
          }}
        />
      </NavigationContainer>
      <UpdateModal visible={showUpdateModal} />
    </>
  );
};

export default Main;
