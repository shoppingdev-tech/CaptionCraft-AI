import {

    StyleSheet,
  } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
      flexGrow: 1,
      borderRadius: 20,
    },
    title: {
      ...theme.fonts.style,
      color: theme.colors.white,
    },
    italictext: {
      ...theme.fonts.italicStyle,
      color: theme.colors.primary,
      textAlign: 'center'
    },
    uploadContainer: {
      backgroundColor: theme.colors.white,
      padding: 20,
      borderRadius: 15,
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      marginBottom: 15,
    },
    uploadText: {
      ...theme.fonts.subtitle1Style,
      color: theme.colors.primary,
    },
    input: {
      ...theme.fonts.subtitle1Style,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 15,
      padding: 15,
      color: theme.colors.textPrimary,
      backgroundColor: theme.colors.white,
    },
    pickerItem: {
      ...theme.fonts.semiBoldStyle,
      color: theme.colors.textPrimary,
    },
    chooseStyleLabel: {
      ...theme.fonts.semiBoldStyle,
      color: theme.colors.textPrimary,
      fontSize: 18,
      marginBottom: 20,
    },
    pickerContainer: {
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    picker: {
      color: theme.colors.textPrimary,
      backgroundColor: theme.colors.white,
    },
    styleButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    styleButton: {
      backgroundColor: '#E0E7FF',
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 15,
    },
    activeStyleButton: {
      backgroundColor: theme.colors.primary,
    },
    styleButtonText: {
      ...theme.fonts.semiBoldStyle,
      color: theme.colors.primary,
    },
    activeStyleText: {
      color: '#fff',
    },
    button: {
      marginBottom: 120,
      marginHorizontal: 20,
    },
    gradientButton: {
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      ...theme.fonts.semiBoldStyle,
      color: theme.colors.white,
    },
    skipText: {
      textAlign: 'center',
      color: theme.colors.textSecondary,
      fontSize: 14,
      fontFamily: theme.fonts.style.fontFamily,
      marginTop: 10,
    },
    uploadImage: {
     height: 30,
     width: 30,
     borderRadius: 15,
     resizeMode: 'contain',
    },
  });