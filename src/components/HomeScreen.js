import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Image from 'react-native-fast-image';
import { launchImageLibrary } from 'react-native-image-picker';

import { theme } from '../theme';
import { Picker } from '@react-native-picker/picker';
import { generateImageCaptions } from '../redux/api';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('Funny');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log('user', user?.username);

  useEffect(() => {
    requestGalleryPermission();
  }, [])

  const requestGalleryPermission = async () => {
    if (Platform.OS !== 'android') return true; // iOS skips
    try {
      const granted =
        Platform.Version >= 33
          ? await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Media Permission',
              message: 'App needs access to your photos to pick images.',
              buttonPositive: 'OK',
            },
          )
          : await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to pick images.',
              buttonPositive: 'OK',
            },
          );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={{}}>
        <LinearGradient
          colors={['#6366F1', '#D946EF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientButton, { justifyContent: 'space-between', flexDirection: 'row', padding: 20, paddingTop: 50, alignItems: 'center', borderRadius: 0, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }]}
        >
          <View>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.title}>{user?.username}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon name='settings' color={theme.colors.white} size={30} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    
      <ScrollView style={[styles.container, styles.scrollView]}>
        <View style={styles.cardSection}>
          <Text style={styles.stepTitle}>📸 Upload Image</Text>
          <Text style={styles.stepText}>
            Choose a photo from your gallery that you want to caption.
          </Text>

          <Text style={styles.stepTitle}>📝 Add Description</Text>
          <Text style={styles.stepText}>
            Briefly describe your image to get relevant captions.
          </Text>

          <Text style={styles.stepTitle}>🎨 Choose Style</Text>
          <Text style={styles.stepText}>
            Pick a style like Funny, Romantic, or Cool to match your mood.
          </Text>

          <Text style={styles.stepTitle}>⚡ Generate Captions</Text>
          <Text style={styles.stepText}>
            Tap the button and get a caption + hashtags instantly!
          </Text>

          <Text style={styles.stepTitle}>🌟 Save or Share</Text>
          <Text style={styles.stepText}>
            You can favorite captions, copy them, or share with friends.
          </Text>

          <Text style={styles.tokenNote}>Each request costs 10 tokens.</Text>
        </View>
        <View style={styles.buttonRowContainer}>
        <LinearGradient
          colors={['#6366F1', '#D946EF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButtonRow}
        >
          <TouchableOpacity onPress={() => navigation.navigate('GenerateCaptions')} style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>Generate</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* <LinearGradient
          colors={['#6366F1', '#D946EF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButtonRow}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Packs')} style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>Buy Tokens</Text>
          </TouchableOpacity>
        </LinearGradient> */}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  title: {
    ...theme.fonts.boldStyle,
    color: theme.colors.white,
  },
  scrollView: {
    // marginBottom: 120
  },
  gradientButtonRow: {
    flex: 1,
    borderRadius: 14,
  },
  buttonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 20,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...theme.fonts.h2Style,
    color: theme.colors.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...theme.fonts.subtitle2Style,
    color: theme.colors.white,
    marginTop: 4,
    textAlign: 'center',
  },
  cardSection: {
    backgroundColor: '#EDE9FE', // soft lavender
    margin: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  stepTitle: {
    ...theme.fonts.semiBoldStyle,
    color: theme.colors.textPrimary,
    marginTop: 20,
  },
  stepText: {
    ...theme.fonts.body2Style,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  tokenNote: {
    ...theme.fonts.italicStyle,
    color: theme.colors.primary,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  gradientButton: {
    borderRadius: 16,
  },
  buttonTouchable: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    ...theme.fonts.boldStyle,
    color: theme.colors.white,
  },
});

export default HomeScreen;


