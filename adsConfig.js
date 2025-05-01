// adsConfig.js
import { TestIds } from 'react-native-google-mobile-ads';

export const BannerAdUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8690504943489361/7411996242'; // <-- Replace with your real Banner Ad ID

export const InterstitialAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-8690504943489361/2401657815'; // <-- Replace with your real Interstitial ID

export const AppOpenAdUnitId = __DEV__
  ? TestIds.APP_OPEN
  : 'ca-app-pub-8690504943489361/6033968414'; // <-- Replace with your real App Open ID
