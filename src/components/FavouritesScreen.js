import React from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { theme } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../styles/favourite';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavouriteCaption } from '../redux/slices/favourite';

const FavouritesScreen = ({navigation}) => {
  const { favouriteCaption } = useSelector((state) => state.favouriteCaptions);
  const dispatch = useDispatch();

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
          <Text style={styles.title}>Result</Text>
          <Text style={styles.title}>Paresh</Text>
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {favouriteCaption.map((item, index) => (
          <TouchableOpacity onPress={() => navigation.navigate('CaptionDetails', {
            item,
            image: item?.image
          })} key={index} style={styles.card}>
            <View style={styles.cardContent}>
              <TouchableOpacity onPress={() => dispatch(removeFavouriteCaption(item.id))} style={styles.favouriteIcon}>
                <AntDesign name="heart" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
              <View style={{flexShrink: 1, width: '80%'}}>
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
    </View>
  );
};

export default FavouritesScreen;
