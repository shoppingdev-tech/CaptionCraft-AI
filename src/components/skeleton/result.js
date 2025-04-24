import React from 'react';
import { View, StyleSheet } from 'react-native';
import Skeleton from 'react-native-skeleton-loading';

const CaptionSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton>
        <View style={styles.image} />
        <View style={styles.captionBox} />
        <View style={styles.captionBox} />
        <View style={styles.captionBox} />
      </Skeleton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  captionBox: {
    height: 60,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#e0e0e0',
  },
});

export default CaptionSkeleton;
