import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollView: {
    padding: 16,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    ...theme.fonts.boldStyle,
    color: theme.colors.white,
  },
  headerTitle: {
    ...theme.fonts.h2Style,
    color: theme.colors.white,
  },
  bannerImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    marginTop: 15
  },
  captionText: {
    flex: 1,
    ...theme.fonts.subtitle1Style,
    color: theme.colors.textPrimary,
  },
  hashtags: {
    ...theme.fonts.subtitle2Style,
    color: theme.colors.black,
  },
  favourite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
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
  }
});
