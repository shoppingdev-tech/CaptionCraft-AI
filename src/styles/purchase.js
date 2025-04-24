import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    ...theme.fonts.h2Style,
    color: theme.colors.white,
    marginBottom: 24,
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  planTitle: {
    ...theme.fonts.h4StyleMedium,
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  planDescription: {
    ...theme.fonts.body2Style,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  planPrice: {
    ...theme.fonts.boldStyle,
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  button: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    ...theme.fonts.boldStyle,
    color: theme.colors.white,
  },
});
