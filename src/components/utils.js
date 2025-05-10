import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import { Share } from 'react-native';
import i18n from '../i18n';

export const showToast = (type, title, message) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
  });
};

export const copyToClipboard = (text, callback = null) => {
  Clipboard.setString(text);
  showToast('success', i18n.t('copied_success'), i18n.t('copied_success_desc'));
  if (callback) {
    callback();
  }
};

export const handleShareLink = async (message) => {
  try {
    const result = await Share.share({
      message: message,
    });
  } catch (error) {
    showToast('error', i18n.t('sorry'), i18n.t('something_went_wrong'));
  }
};

export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
};
