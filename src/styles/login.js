import {
    StyleSheet,
} from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
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
    passwordContainer: {
      position: 'relative',
    },
    passwordInput: {
      paddingRight: 44,
    },
    eyeIcon: {
      position: 'absolute',
      right: 14,
      top: 14,
    },
    errorText: {
      color: theme.colors.redError,
      marginBottom: 8,
      ...theme.fonts.captionStyle,
    },
    forgotText: {
      color: theme.colors.white,
      textAlign: 'right',
      marginBottom: 24,
      ...theme.fonts.subtitle2Style,
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
    googleButton: {
      backgroundColor: '#EA4335',
      borderRadius: 8,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
      marginBottom: 16,
    },
    googleButtonText: {
      color: theme.colors.white,
      ...theme.fonts.boldStyle,
      marginLeft: 8,
    },
    googleIcon: {
      marginRight: 8,
    },
    footerTextWrap: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    footerText: {
      ...theme.fonts.body2Style,
      color: theme.colors.white,
    },
    linkText: {
      color: theme.colors.white,
      ...theme.fonts.subtitle2Style,
    },
  });
  