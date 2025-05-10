import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { logScreenView, logEvent } from '../firebaseAnalytics';

import { theme } from '../theme';
import { styles as homeStyle } from '../styles/home';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/thunk/auth';
import { useDisableBackHandler } from '../backHandlerUtils';
import LogoutModal from './logout';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useDisableBackHandler();
  const { user } = useSelector((state) => state.auth);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  useEffect(() => {
    // Log screen view when component mounts
    logScreenView('SettingsScreen');
  }, []);

  const handleBackPress = () => {
    logEvent('settings_back_pressed', {
      user_id: user?.id,
      username: user?.username
    });
    navigation.goBack();
  };

  const handleLogoutPress = () => {
    logEvent('logout_pressed', {
      user_id: user?.id,
      username: user?.username
    });
    setIsLogoutModalVisible(true);
  };

  const handleLanguagePress = () => {
    logEvent('language_settings_pressed', {
      user_id: user?.id,
      username: user?.username
    });
    navigation.navigate('ChangeLanguage');
  };

  const handlePrivacyPolicyPress = () => {
    logEvent('privacy_policy_pressed', {
      user_id: user?.id,
      username: user?.username
    });
    Linking.openURL('https://raw.githubusercontent.com/shoppingdev-tech/caption-craft-ai/main/privacy-policy.md');
  };

  return (
    <View style={homeStyle.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={{ backgroundColor: '#F3F4F6' }}>
        <LinearGradient
          colors={['#6366F1', '#D946EF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingHorizontal: 20,
            paddingTop: 40,
            paddingBottom: 10
          }}
        >
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
          }} onPress={handleBackPress}>
            <View>
              <Icon name="arrow-back-sharp" size={24} color={theme.colors.white} />
            </View>

            <Text style={{
              color: theme.colors.white,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 20,
              marginLeft: 20
            }}>
              {t('settings')}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <ScrollView style={styles.container}>
        {/* Token Card */}
        <View style={styles.tokenCard}>
          <Text style={styles.tokenTitle}>{t('available_tokens')}</Text>
          <Text style={styles.tokenValue}>{user?.token ?? 0}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsWrapper}>
          {/* <SettingItem
            title={t('change_password')}
            icon="lock-open-outline"
            onPress={() => navigation.navigate('ChangePassword')}
          /> */}
          {/* <SettingItem
            title={t('buy_tokens')}
            icon="battery-half"
            onPress={() => navigation.navigate('Packs')}
          /> */}
          <SettingItem
            title={t('change_language', 'Change Language')}
            icon="language-outline"
            onPress={handleLanguagePress}
          />
          <TouchableOpacity style={styles.item} onPress={handlePrivacyPolicyPress}>
            <MaterialIcons name={'security'} size={24} color={theme.colors.primary} />
            <Text style={styles.itemText}>{t('privacy_policy')}</Text>
            <Icon name="chevron-forward" size={22} color={theme.colors.gray} style={styles.arrow} />
          </TouchableOpacity>
          <SettingItem
            title={t('logout')}
            icon="trail-sign-outline"
            onPress={handleLogoutPress}
          />
        </View>

        {/* Remove Ads Button */}
        {/* <Text style={styles.sectionLabel}>Want ad-free experience?</Text> */}
        {/* <LinearGradient
          colors={['#6366F1', '#D946EF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.removeAdsButton}
        >
          <TouchableOpacity onPress={() => navigation.navigate('RemoveAds')} style={styles.removeAdsTouchable}>
            <Text style={styles.removeAdsText}>Remove Ads</Text>
        </TouchableOpacity>
        </LinearGradient> */}
      </ScrollView>
      <LogoutModal visible={isLogoutModalVisible} onConfirm={() => dispatch(logout())} onClose={() => setIsLogoutModalVisible(false)} />
    </View>
  );
};

const SettingItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Icon name={icon} size={24} color={theme.colors.primary} />
    <Text style={styles.itemText}>{title}</Text>
    <Icon name="chevron-forward" size={22} color={theme.colors.gray} style={styles.arrow} />
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  tokenCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  tokenTitle: {
    ...theme.fonts.subtitle2Style,
    color: theme.colors.white,
    marginBottom: 4,
  },
  tokenValue: {
    ...theme.fonts.h1Style,
    color: theme.colors.white,
  },
  sectionLabel: {
    ...theme.fonts.subtitle1Style,
    marginBottom: 8,
    color: theme.colors.textSecondary,
  },
  optionsWrapper: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 30,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemText: {
    flex: 1,
    marginLeft: 12,
    ...theme.fonts.subtitle2Style,
    color: theme.colors.textPrimary,
  },
  arrow: {
    marginLeft: 8,
  },
  removeAdsButton: {
    borderRadius: 16,
  },
  removeAdsTouchable: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  removeAdsText: {
    color: theme.colors.white,
    ...theme.fonts.boldStyle,
  },
});


export default SettingsScreen;


