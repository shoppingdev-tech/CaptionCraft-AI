import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

import { styles } from '../styles/captionDetails';
import { theme } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { addFavouriteCaption, removeFavouriteCaption } from '../redux/slices/favourite';
import { useDisableBackHandler } from '../backHandlerUtils';
import { copyToClipboard, handleShareLink, showToast } from './utils';
import i18n from '../i18n';
import { DetailsScreenBanner } from '../../adsConfig';
import { logErrorToFirestore } from '../redux/errorApi';

const CaptionDetailsScreen = ({ route, navigation }) => {
  useDisableBackHandler();
  const { item, image } = route.params; // Make sure to pass this from the previous screen
  const dispatch = useDispatch();
  const { favouriteCaption } = useSelector((state) => state.favouriteCaptions);
  const [isAdsLoaded, setIsAdsLoaded] = useState(true);
  const favouriteItem = () => {
    const payload = {
      ...item,
      image,
    }
    dispatch(addFavouriteCaption(payload));
    showToast('success', i18n.t('added'), i18n.t('caption_added_to_favorites'));
  }
  const isFavorite = favouriteCaption && favouriteCaption?.find(fav => fav?.id == item?.id);
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* Header Gradient */}
      <LinearGradient
        colors={['#6366F1', '#D946EF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.header,]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.favourite}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="arrow-back-sharp" size={24} color={theme.colors.white} />
            <Text style={[styles.title, { marginLeft: 20 }]}>{i18n.t('caption_details')}</Text>
          </View>
          <TouchableOpacity onPress={() => isFavorite ? dispatch(removeFavouriteCaption(item.id)) : favouriteItem()} style={styles.favouriteIcon}>
            <AntDesign name="heart" size={24} color={isFavorite ? theme.colors.primary : theme.colors.gray} />
          </TouchableOpacity>
        </TouchableOpacity>
      </LinearGradient>
      {
        isAdsLoaded && (
          <View style={{ marginTop: 20 }}>
            <BannerAd
              unitId={DetailsScreenBanner}
              size={BannerAdSize.ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              onAdLoaded={() => {
                setIsAdsLoaded(true);
              }}
              onAdFailedToLoad={async(error) => {
                await logErrorToFirestore('CaptionDetailsScreen Banner Ad Failed to Load', JSON.stringify(error));
                setIsAdsLoaded(false);
              }}
            />
          </View>
        )
      }
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FastImage
          source={{ uri: image.uri }}
          style={styles.bannerImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'flex-end', paddingHorizontal: 15, paddingTop: 15 }}>
          <TouchableOpacity onPress={() => copyToClipboard(item.caption)}>
            <Ionicons name="copy-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShareLink(item.caption)}>
            <Ionicons name="share-social-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.captionText}>{item.caption}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'flex-end', padding: 15 }}>
          <TouchableOpacity onPress={() => copyToClipboard(item.hashtags.join(' '))}>
            <Ionicons name="copy-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShareLink(item.hashtags.join(' '))}>
            <Ionicons name="share-social-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: theme.colors.lightGray, padding: 15, borderRadius: 10 }}>
          <Text style={styles.hashtags}>
            {item.hashtags.join(' ')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CaptionDetailsScreen;
