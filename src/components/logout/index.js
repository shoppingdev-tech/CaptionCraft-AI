import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export default function LogoutModal({ visible, onClose, onConfirm }) {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Are you sure?</Text>
                    <Text style={styles.message}>Do you really want to logout?</Text>

                    <View style={styles.buttonRow}>
                        {/* Cancel Button with Gray Gradient */}
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <LinearGradient
                                colors={['#E5E7EB', '#D1D5DB']} // Gray gradient for cancel button
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradientButton}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Confirm (Logout) Button with Original Gradient */}
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={onConfirm}
                        >
                            <LinearGradient
                                colors={['#6366F1', '#D946EF']} // Original gradient for logout button
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradientButton}
                            >
                                <Text style={styles.buttonText}>Logout</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        backgroundColor: theme.colors.white,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.85, // Slightly smaller width for better UI balance
    },
    title: {
        ...theme.fonts.h2Style,
        color: theme.colors.textPrimary,
        marginBottom: 12,
    },
    message: {
        ...theme.fonts.body1Style,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: 24,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        marginHorizontal: 8, // Consistent spacing between buttons
        borderRadius: 8,
        height: 50, // Ensure buttons have the same height
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientButton: {
        flex: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        ...theme.fonts.subtitle2Style,
        color: theme.colors.white,
        paddingHorizontal: 30
    },
    cancelButton: {
        // Gray gradient for cancel button
    },
    confirmButton: {
        // Optional: Additional styling for confirmation button if needed
    },
});
