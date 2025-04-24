import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  illustration: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    ...theme.fonts.h1Style,
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    ...theme.fonts.semiBoldStyle,
    color: theme.colors.textSecondary,
    marginBottom: 32,
  },
  okButton: {
    width: '90%',
    borderRadius: 30,
  },
  gradientButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  okText: {
    ...theme.fonts.boldStyle,
    color: theme.colors.white,
  },
});
