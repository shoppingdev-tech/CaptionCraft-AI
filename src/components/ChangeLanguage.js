import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/slices/authSlice';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { logScreenView, logEvent } from '../firebaseAnalytics';
import LinearGradient from 'react-native-linear-gradient';
import { styles as homeStyle } from '../styles/home';
import Icon from 'react-native-vector-icons/Ionicons';
import { showToast } from './utils';

const LANGUAGES = [
  { code: 'en', label: 'English', icon: 'flag', iconColor: '#2d6cdf' },
  { code: 'de', label: 'Deutsch', icon: 'flag', iconColor: '#000' },
  { code: 'fr', label: 'Français', icon: 'flag', iconColor: '#0055A4' },
  { code: 'es', label: 'Español', icon: 'flag', iconColor: '#c60b1e' },
  { code: 'it', label: 'Italiano', icon: 'flag', iconColor: '#008C45' },
];

const ChangeLanguageScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.auth.language);

  useEffect(() => {
    logScreenView('ChangeLanguageScreen');
  }, []);

  const handleChangeLanguage = (code) => {
    logEvent('language_changed', {
      from_language: selectedLanguage,
      to_language: code
    });
    i18n.changeLanguage(code);
    dispatch(setLanguage(code));
    showToast('success', t('language_changed'), t('language_changed_success'));
  };

  const handleLogin = () => {
    logEvent('change_language_go_back_pressed');
    navigation.goBack();
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
          }} onPress={handleLogin}>
            <View>
              <Icon name="arrow-back-sharp" size={24} color={theme.colors.white} />
            </View>
            <Text style={{
              color: theme.colors.white,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 20,
              marginLeft: 20
            }}>
              {t('change_language')}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <ScrollView style={styles.container}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.langButton,
              selectedLanguage === lang.code && styles.selectedLangButton,
            ]}
            onPress={() => handleChangeLanguage(lang.code)}
          >
            <View style={styles.langRow}>
              <MaterialCommunityIcons name={lang.icon} size={24} color={lang.iconColor} style={styles.flagIcon} />
              <Text style={[styles.langText, theme.fonts.h4Style]}>{lang.label}</Text>
            </View>
            {selectedLanguage === lang.code && (
              <MaterialCommunityIcons name="check" size={22} color={theme.colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 24,
  },
  header: {
    marginBottom: 32,
    textAlign: 'center',
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    backgroundColor: theme.colors.lightGray,
  },
  selectedLangButton: {
    borderColor: theme.colors.primary,
    backgroundColor: '#E0E7FF',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagIcon: {
    marginRight: 16,
  },
  langText: {
    color: theme.colors.textPrimary,
  },
});

export default ChangeLanguageScreen; 