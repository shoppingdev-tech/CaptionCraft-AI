import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import styles from '../styles/error';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'; // Make sure to install Feather icons
import { theme } from '../theme';
import i18n from '../i18n';

const ErrorScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.white} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <Image
        source={require('../assets/Error.png')}
        style={styles.illustration}
        resizeMode="contain"
      />

      <Text style={styles.title}>{i18n.t('oops')}</Text>
      <Text style={styles.subtitle}>{i18n.t('try_again_later')}</Text>

      <TouchableOpacity style={styles.okButton}>
        <LinearGradient
              colors={['#6366F1', '#D946EF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} // Indigo to Purple gradient
          style={styles.gradientButton}
        >
          <Text style={styles.okText}>{i18n.t('ok')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;
