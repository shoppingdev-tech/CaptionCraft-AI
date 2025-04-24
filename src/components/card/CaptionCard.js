import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/result';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const CaptionCard = ({ item, image }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('CaptionDetails', {
      item,
      image
    })} style={styles.card}>
      <View style={styles.captionContent}>
        <Text numberOfLines={2} style={styles.captionText}>{item.caption}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.tags}
          >
            {item.hashtags?.join(' ')}
          </Text>
        </View>
      </View>
      <View>
        {/* <Ionicons name="bookmark-outline" size={20} color={theme.colors.textSecondary} /> */}
        <Ionicons name="chevron-forward" size={20} color={theme.colors.black} />
      </View>
    </TouchableOpacity>
  );
};

export default CaptionCard;
