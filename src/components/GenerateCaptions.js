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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Image from 'react-native-fast-image';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

import { theme } from '../theme';
import { styles } from '../styles/home';
import { generateImageCaptions } from '../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from './utils';
import { useDisableBackHandler } from '../backHandlerUtils';

const GenerateCaptionScreen = ({ navigation }) => {
  useDisableBackHandler();
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('Funny');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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

  const pickImage = async () => {
    try {
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) {
        showToast('error', 'Permission', 'File permission is required to access the gallery. Please enable it in your device settings.');
        return;
      }
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true, // ✅
      });

      if (!result.didCancel && result.assets && result.assets.length > 0) {
        setImage(result.assets[0]);
        setImageBase64(result.assets[0].base64); // ✅
      }
    } catch (error) {
      console.log('error', error);

    }
  };

  const handleGenerate = async () => {
    
    try {
      if(isNaN(user?.token) || user?.token == 0 || user?.token < 0){
        showToast('error', 'Token balance is zero!', 'Please contact support or admin to recharge');
        return;
      }
      if (!imageBase64) return showToast('error', 'Upload', "Please upload an image");
      const userDoc = await firestore().collection('users').doc(user?.id).get();
      const userData = userDoc.data();
      firestore().collection('users').doc(user?.id).set(
        { token: Number(userData?.token) - 10 },
        { merge: true }
      );

      dispatch(generateImageCaptions({ imageBase64, description, selectedStyle }));
      navigation.navigate('ResultScreen', { image });

    } catch (error) {
      console.log('error', error);

    }
  };

  const styleOptions = [
    'Funny',
    'Romantic',
    'Love',
    'Selfie',
    'Foodie',
    'Attitude',
    'Trendy',
    'Travel',
    'Festival',
    'Motivational',
    'Friendship',
  ];
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={{ backgroundColor: '#F3F4F6' }}>
        <LinearGradient
          colors={['#6366F1', '#D946EF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 40,
            paddingBottom: 10
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-sharp" size={24} color={theme.colors.white} />
          </TouchableOpacity>

          <Text style={{
            color: theme.colors.white,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
          }}>
            Generate
          </Text>

          <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
              color: theme.colors.white,
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
              marginLeft: 6,
            }}>
              {user?.token}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        <View style={{ marginHorizontal: 20, padding: 20, backgroundColor: theme.colors.lightGray, borderRadius: 10, marginBottom: 20 }}>
          <TouchableOpacity onPress={pickImage} style={styles.uploadContainer}>
            {
              image ? (
                <Image source={{ uri: image.uri }} style={styles.uploadImage} />
              ) : (
                <Icon name="image" size={30} color="#4F8EF7" />
              )
            }
            <Text style={styles.uploadText}>Upload Image</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Describe your post"
            placeholderTextColor={theme.colors.textSecondary}
            style={styles.input}
            multiline={true}
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={{ marginHorizontal: 20, padding: 20, backgroundColor: theme.colors.lightGray, borderRadius: 10, marginBottom: 30 }}>
          <Text style={styles.chooseStyleLabel}>Choose Style</Text>
          <View style={styles.styleButtons}>
            {styleOptions.map((style) => (
              <TouchableOpacity
                key={style}
                style={[
                  styles.styleButton,
                  selectedStyle === style && styles.activeStyleButton,
                ]}
                onPress={() => setSelectedStyle(style)}
              >
                <Text
                  style={[
                    styles.styleButtonText,
                    selectedStyle === style && styles.activeStyleText,
                  ]}
                >
                  {style}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ paddingBottom: 5, paddingHorizontal: 20 }}>
          <Text style={styles.italictext}>Each request cost 10 Tokens</Text>
        </View>
        <TouchableOpacity onPress={() => handleGenerate()} style={styles.button}>
          <LinearGradient
            colors={['#6366F1', '#D946EF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Generate Captions</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default GenerateCaptionScreen;


