import React from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { styles } from '../styles/captionDetails';
import { theme } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { addFavouriteCaption, removeFavouriteCaption } from '../redux/slices/favourite';

const CaptionDetailsScreen = ({ route }) => {
  const { item, image } = route.params; // Make sure to pass this from the previous screen
  const dispatch = useDispatch();
  const { favouriteCaption } = useSelector((state) => state.favouriteCaptions);

  const favouriteItem = () => {
    const payload = {
      ...item,
      image,
    }
    dispatch(addFavouriteCaption(payload));
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
        style={[styles.header, styles.favourite]}
      >
        <Text style={styles.headerTitle}>Caption Details</Text>
        <TouchableOpacity onPress={() => isFavorite ? dispatch(removeFavouriteCaption(item.id)) : favouriteItem()} style={styles.favouriteIcon}>
          <AntDesign name="heart" size={24} color={isFavorite ? theme.colors.primary : theme.colors.gray} />
        </TouchableOpacity>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FastImage
          source={{ uri: image.uri }}
          style={styles.bannerImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'flex-end', paddingHorizontal: 15, paddingTop: 15 }}>
          <TouchableOpacity>
            <Ionicons name="copy-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.captionText}>{item.caption}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'flex-end', padding: 15 }}>
          <TouchableOpacity>
            <Ionicons name="copy-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity>
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
