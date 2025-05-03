import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../theme';
import i18n from '../i18n';
import purchaseStyles from '../styles/purchase';

const UpdateModal = ({ visible }) => {
  const storeUrl =
    Platform.OS === 'android'
      ? 'https://play.google.com/store/apps/details?id=com.yourapp.package'
      : 'https://apps.apple.com/app/id123456789';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.titleRow}>
            <Ionicons name="information-circle-outline" size={28} color={theme.colors.primary} style={styles.icon} />
            <Text style={[styles.title, theme.fonts.h4StyleMedium, { color: theme.colors.primary }]}>{i18n.t('update_required')}</Text>
          </View>
          <Text style={[styles.message, theme.fonts.body1Style, { color: theme.colors.textPrimary }]}>
            {i18n.t('new_version_available')}
          </Text>
          <View style={styles.buttonRight}>
            <TouchableOpacity style={[purchaseStyles.button, {paddingVertical: 10}]} onPress={() => Linking.openURL(storeUrl)}>
              <LinearGradient
                colors={['#6366F1', '#D946EF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{paddingVertical: 12, paddingHorizontal: 15, borderRadius: 10  }}
              >
                <Text style={purchaseStyles.buttonText}>{i18n.t('update_now')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    padding: 24,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.white,
    alignItems: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    // font size reduced via theme.fonts.h4Style
  },
  message: {
    textAlign: 'left',
    marginBottom: 10,
    color: theme.colors.textPrimary,
    alignSelf: 'flex-start',
  },
  buttonRight: {
    alignSelf: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default UpdateModal;
