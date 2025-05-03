import React from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Image from 'react-native-fast-image'

import { theme } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../styles/favourite';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const FavouritesScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { favouriteCaption } = useSelector((state) => state.favouriteCaptions);
  const { user } = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={{}}>
        <LinearGradient
          colors={['#6366F1', '#D946EF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientButton, { padding: 20, paddingTop: 50, alignItems: 'flex-start', borderRadius: 0, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }]}
        >
          <Text style={styles.title}>{t('your_favorite_captions')}</Text>
          <Text style={styles.title}>{user?.username}</Text>
        </LinearGradient>
      </View>
      {favouriteCaption && favouriteCaption.length == 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image resizeMode="contain"
            style={{ height: 200, width: 200, }} source={require('../assets/NoFavorite.png')} />
          <Text style={styles.noFavorite}>{t('no_favorite_yet')}</Text>
          <Text style={styles.noFavoriteDesc}>{t('save_favorite_desc')}</Text>

        </View>
      )}
      {
        favouriteCaption && favouriteCaption.length > 0 && (
          <ScrollView contentContainerStyle={styles.scrollView}>
            {favouriteCaption.map((item, index) => (
              <TouchableOpacity onPress={() => navigation.navigate('CaptionDetails', {
                item,
                image: item?.image
              })} key={index} style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={styles.favouriteIcon}>
                    <AntDesign name="heart" size={24} color={theme.colors.primary} />
                  </View>
                  <View style={{ flexShrink: 1, width: '80%' }}>
                    <Text numberOfLines={2} style={styles.cardText}>{item.caption}</Text>
                    <Text
                      numberOfLines={1}
                      style={styles.tags}
                    >
                      {item.hashtags?.join(' ')}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.black} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )
      }
    </View>
  );
};

export default FavouritesScreen;
