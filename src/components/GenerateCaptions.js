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
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { logScreenView, logEvent } from '../firebaseAnalytics';
import {
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

import { theme } from '../theme';
import { styles } from '../styles/home';
import { generateImageCaptions } from '../redux/api';
import { useDispatch } from 'react-redux';
import { showToast } from './utils';
import { useDisableBackHandler } from '../backHandlerUtils';
import { GenerateScreenBanner } from '../../adsConfig';

const GenerateCaptionScreen = ({ navigation }) => {
  const { t } = useTranslation();
  useDisableBackHandler();
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('Funny');
  const [isAdsLoaded, setIsAdsLoaded] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // Log screen view when component mounts
    logScreenView('GenerateCaptionsScreen');
  }, []);

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
        showToast('error', i18n.t('permission'), i18n.t('file_permission_required'));
        return;
      }
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });

      if (!result.didCancel && result.assets && result.assets.length > 0) {
        setImage(result.assets[0]);
        setImageBase64(result.assets[0].base64);
        logEvent('image_selected');
      }
    } catch (error) {
      // console.log('error', error);
    }
  };

  const handleGenerate = async () => {
    try {
      if (!imageBase64) return showToast('error', i18n.t('upload_error'), i18n.t('upload_error_desc'));
      logEvent('caption_generation_started');
      dispatch(generateImageCaptions({ imageBase64, description, selectedStyle }));
      navigation.navigate('ResultScreen', { image });

    } catch (error) {
      logEvent('caption_generation_error', {
        error: error.message
      });
    }
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    logEvent('style_selected', {
      style: style
    });
  };

  const styleOptions = [
    t('funny'),
    t('romantic'),
    t('love'),
    t('selfie'),
    t('foodie'),
    t('attitude'),
    t('trendy'),
    t('travel'),
    t('festival'),
    t('motivational'),
    t('friendship'),
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
            {t('generate')}
          </Text>

          <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      {
        isAdsLoaded && (
          <View style={{ marginTop: 20 }}>
            <BannerAd
              unitId={GenerateScreenBanner}
              size={BannerAdSize.ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              onAdLoaded={() => {
                setIsAdsLoaded(true);
              }}
              onAdFailedToLoad={(error) => {
                console.log('error', error);
                setIsAdsLoaded(false);
              }}
            />
          </View>
        )
      }

      <ScrollView style={{ marginTop: 20, marginBottom: 100 }}>
        <View style={{ marginHorizontal: 20, padding: 20, backgroundColor: theme.colors.lightGray, borderRadius: 10, marginBottom: 20 }}>
          <TouchableOpacity onPress={pickImage} style={styles.uploadContainer}>
            {
              image ? (
                <Image source={{ uri: image.uri }} style={styles.uploadImage} />
              ) : (
                <Icon name="image" size={30} color="#4F8EF7" />
              )
            }
            <Text style={styles.uploadText}>{t('upload_image')}</Text>
          </TouchableOpacity>
          <TextInput
            placeholder={t('describe_post')}
            placeholderTextColor={theme.colors.textSecondary}
            style={styles.input}
            multiline={true}
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={{ marginHorizontal: 20, padding: 20, backgroundColor: theme.colors.lightGray, borderRadius: 10, marginBottom: 30 }}>
          <Text style={styles.chooseStyleLabel}>{t('choose_style')}</Text>
          <View style={styles.styleButtons}>
            {styleOptions.map((style) => (
              <TouchableOpacity
                key={style}
                style={[
                  styles.styleButton,
                  selectedStyle === style && styles.activeStyleButton,
                ]}
                onPress={() => handleStyleSelect(style)}
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
        <Text style={styles.italictext}>{t('each_request_cost')}</Text>
        <TouchableOpacity onPress={() => handleGenerate()} style={styles.button}>
          <LinearGradient
            colors={['#6366F1', '#D946EF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>{t('generate_captions')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default GenerateCaptionScreen;


