// AppOpenAdManager.ts
import { AppOpenAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { AppOpenAdUnitId } from '../adsConfig';

let appOpenAd = AppOpenAd.createForAdRequest(AppOpenAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fun', 'emoji', 'translator'],
});

export const showAppOpenAd = () => {
  appOpenAd.load();

  const adEventListener = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
    appOpenAd.show();
  });

  const adErrorListener = appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
    console.log('App Open Ad Error:', error);
  });

  // Optional: Remove listeners if you need to clean up
  return () => {
    adEventListener();
    adErrorListener();
  };
};
