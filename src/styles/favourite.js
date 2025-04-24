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
    header: {
        ...theme.fonts.h2Style,
        color: theme.colors.textPrimary,
        marginBottom: 16,
      },
      scrollView: {
        paddingBottom: 20,
        padding: 24,
        paddingBottom: 150
      },
      card: {
        backgroundColor: theme.colors.lightGray,
        borderRadius: 16,
        padding: 12,
        // gap: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        // gap: 20,
      },
      icon: {
        width: 24,
        height: 24,
        marginRight: 12,
      },
      cardText: {
        ...theme.fonts.semiBoldStyle,
        color: theme.colors.textPrimary,
      },
      favouriteIcon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.white,
        borderRightWidth: 1,
        padding: 5,
        marginRight: 15
      },
      tags: {
        ...theme.fonts.body2Style,
        color: theme.colors.primary,
        marginTop: 4,
    },
  });