import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const RectangleSkeleton = () => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#f5f5f5'], // Light gray shimmer
  });

  return (
    <View style={{}}>
    <Animated.View style={[styles.rectangle, { backgroundColor }]} />
    <Animated.View style={[styles.rectangle, { backgroundColor }]} />
    <Animated.View style={[styles.rectangle, { backgroundColor }]} />
    <Animated.View style={[styles.rectangle, { backgroundColor }]} />
    <Animated.View style={[styles.rectangle, { backgroundColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: '90%',
    marginHorizontal: 20,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default RectangleSkeleton;
