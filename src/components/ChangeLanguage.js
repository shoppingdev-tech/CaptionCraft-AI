import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/slices/authSlice';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../theme';

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
  const selectedLanguage = useSelector((state) => {
  console.log('selectedLanguage', state.auth);

    return state.auth.language
  });
  const handleChangeLanguage = (code) => {
    i18n.changeLanguage(code);
    dispatch(setLanguage(code));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Text style={[styles.header, theme.fonts.h2Style, { color: theme.colors.primary }]}>{t('change_language')}</Text>
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
            <Icon name={lang.icon} size={24} color={lang.iconColor} style={styles.flagIcon} />
            <Text style={[styles.langText, theme.fonts.h4Style]}>{lang.label}</Text>
          </View>
          {selectedLanguage === lang.code && (
            <Icon name="check" size={22} color={theme.colors.primary} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 24,
    justifyContent: 'center',
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