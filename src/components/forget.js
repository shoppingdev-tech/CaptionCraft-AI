import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { logScreenView, logEvent } from '../firebaseAnalytics';

// Replace with your actual theme file or hardcode styles if not using a theme
import { theme } from '../theme'; // Make sure this path is correct
import { showToast } from './utils';

export default function ForgotPasswordScreen({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [touched, setTouched] = useState({ email: false });

  useEffect(() => {
    // Log screen view when component mounts
    logScreenView('ForgotPasswordScreen');
  }, []);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  };

  const handleResetPassword = async () => {
    validateEmail();
    setTouched({ email: true });

    if (!emailValid) {
      logEvent('reset_password_validation_failed', {
        email_valid: emailValid
      });
      return;
    }

    try {
    setIsLoading(true);
      await auth().sendPasswordResetEmail(email);
      showToast('success', t('reset_password'), t('reset_password_email_sent', 'Password reset email sent!'));
      setIsLoading(false);
      navigation.navigate('Login');
    } catch (error) {
      setIsLoading(false);
      showToast('failed', t('sorry'), error.message || t('something_went_wrong'));
    }
  };

  const handleBackToLogin = () => {
    logEvent('back_to_login_pressed');
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={['#6366F1', '#D946EF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>{t('forgot_password_title')}</Text>
        <Text style={styles.subHeader}>{t('forgot_password_sub')}</Text>

        <TextInput
          style={[
            styles.input,
            {
              borderColor:
                !emailValid && touched.email ? '#DC2626' : theme.colors.white,
            },
          ]}
          placeholder={t('email')}
          placeholderTextColor={theme.colors.white}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onBlur={() => {
            setTouched((prev) => ({ ...prev, email: true }));
            validateEmail();
          }}
        />
        {!emailValid && touched.email && (
          <Text style={styles.errorText}>{t('valid_email')}</Text>
        )}

        <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
          <View style={styles.gradientButton}>
            {
              isLoading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text style={styles.buttonText}>{t('reset_password')}</Text>
              )
            }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBackToLogin}>
          <Text style={styles.linkText}>{t('back_to_login')}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    ...theme.fonts.h1Style,
    color: theme.colors.white,
    marginBottom: 8,
  },
  subHeader: {
    ...theme.fonts.subtitle1Style,
    color: theme.colors.white,
    marginBottom: 24,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    ...theme.fonts.body1Style,
    color: theme.colors.white,
  },
  errorText: {
    color: '#F87171',
    marginBottom: 8,
    ...theme.fonts.captionStyle,
  },
  button: {
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  gradientButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    ...theme.fonts.boldStyle,
  },
  linkText: {
    color: theme.colors.white,
    textAlign: 'center',
    marginTop: 16,
    ...theme.fonts.subtitle2Style,
  },
});
