import React, { useContext } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import { ThemeContext } from '../../ThemeContext';

const UpdateModal = ({ visible, onConfirm }) => {
    const { theme } = useContext(ThemeContext);


  const storeUrl =
    Platform.OS === 'android'
      ? 'https://play.google.com/store/apps/details?id=com.yourapp.package'
      : 'https://apps.apple.com/app/id123456789';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay]}>
        <View style={[styles.container, { backgroundColor: theme.background, borderColor: theme.borderColor }]}>
          <Text style={[styles.title, { color: theme.primary }]}>Update Required</Text>
          <Text style={[styles.message, { color: theme.text }]}>
            A new version of the app is available. Please update to continue.
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.buttonBackground }]}
            onPress={() => {
              Linking.openURL(storeUrl);
              onConfirm(); // optional close action
            }}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>Update Now</Text>
          </TouchableOpacity>
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
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default UpdateModal;
