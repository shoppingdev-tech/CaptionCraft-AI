import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import { Share } from 'react-native';

export const showToast = (type, title, message) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
  });
};

export const copyToClipboard = (text, callback = null) => {
  Clipboard.setString(text);
  showToast('success', 'Copied successfully!', 'Feel free to paste it wherever you need.');
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
    showToast('error', 'Sorry!', 'Something went wrong! Please try after sometimes');

  }
};