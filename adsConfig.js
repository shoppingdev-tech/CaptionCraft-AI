// adsConfig.js
import { TestIds } from 'react-native-google-mobile-ads';

const isDev = __DEV__;

export const HomeBanner = isDev
  ? TestIds.BANNER
  : 'ca-app-pub-8690504943489361/2990423556'; // <-- Replace with your real Banner Ad ID

  export const ResultScreenBanner = isDev
  ? TestIds.BANNER
  : 'ca-app-pub-8690504943489361/1644410656'; // <-- Replace with your real Banner Ad ID

  export const GenerateScreenBanner = isDev
  ? TestIds.BANNER
  : 'ca-app-pub-8690504943489361/4974423218'; // <-- Replace with your real Banner Ad ID

  export const DetailsScreenBanner = isDev
  ? TestIds.BANNER
  : 'ca-app-pub-8690504943489361/3832731933'; // <-- Replace with your real Banner Ad ID

  export const FavouriteScreenBanner = isDev
  ? TestIds.BANNER
  : 'ca-app-pub-8690504943489361/6160346524'; // <-- Replace with your real Banner Ad ID


  export const SettingScreenBanner = isDev
  ? TestIds.BANNER
  : 'ca-app-pub-8690504943489361/5165687411'; // <-- Replace with your real Banner Ad ID



export const AppOpenAdUnitId = isDev
  ? TestIds.APP_OPEN
  : 'ca-app-pub-8690504943489361/3477201223'; // <-- Replace with your real App Open ID



  export const InterstitialAdUnitId = isDev
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-8690504943489361/5145813600'; // <-- Replace with your real Interstitial ID
