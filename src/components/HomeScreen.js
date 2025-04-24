import React, { useState } from 'react';
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { theme } from '../theme';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/home';
import { generateImageCaptions } from '../redux/api';
import { useDispatch } from 'react-redux';

const HomeScreen = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('Funny');
  const dispatch = useDispatch();
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
    console.log('hasPermission', hasPermission);
    
    if (!hasPermission) {
      alert('Permission denied!');
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
    if (!imageBase64) return alert("Please upload an image");
  
    dispatch(generateImageCaptions({imageBase64, description, selectedStyle}));    
    navigation.navigate('ResultScreen', { image });

  };

  const styleOptions = ['Funny', 'Romantic', 'Motivational', 'Trendy', 'Desi', 'Mood And Son seel all', 'To'];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={{    }}>
      <LinearGradient
              colors={['#6366F1', '#D946EF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.gradientButton,{padding: 20, paddingTop: 50, alignItems: 'flex-start', borderRadius: 0, borderBottomLeftRadius: 30, borderBottomRightRadius: 30}]}
            >
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.title}>Paresh</Text>
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

        <View style={{ marginHorizontal: 20,padding: 20, backgroundColor: theme.colors.lightGray, borderRadius: 10, marginBottom: 30 }}>
          <Text style={styles.chooseStyleLabel}>Choose Style</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedStyle}
              onValueChange={(itemValue) => setSelectedStyle(itemValue)}
              style={styles.picker}
            >
              {styleOptions.map((style) => (
                <Picker.Item key={style} label={style} value={style} style={styles.pickerItem} />
              ))}
            </Picker>
          </View>
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

          <TouchableOpacity onPress={() => handleGenerate ()} style={styles.button}>
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

export default HomeScreen;


