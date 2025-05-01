import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import { theme } from '../theme';
import { updateUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { logout } from '../redux/thunk/auth';
import { showToast } from './utils';

export default function VerifyEmailScreen({ navigation }) {
    const user = auth().currentUser;
    const dispatch = useDispatch();


    useEffect(() => {
        const id = setInterval(() => {
            checkVerification();
        }, 5000);

        return () => clearInterval(id);
    }, []);

    const checkVerification = async () => {
        try {
            await user.reload();
            const refreshedUser = auth().currentUser;
            if (refreshedUser.emailVerified) {
                const uid = refreshedUser.uid;
                showToast('success', 'Email Verified', 'Your email has been successfully verified.');
                await firestore().collection('users').doc(uid).update({
                    isVerified: true,
                    updatedAt: firestore.FieldValue.serverTimestamp(),
                });
                dispatch(updateUser({ isVerified: true }));
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
        }
    };

    const sendVerificationEmail = async () => {
        try {
            await user.sendEmailVerification();
            showToast('success', 'Verification Sent', 'Check your inbox for the verification email.');
        } catch (error) {
            showToast('error', 'Verification Failed', 'Could not send verification email.');
            Alert.alert('Error', error.message);
        }
    };

    return (
        <LinearGradient
            colors={['#6366F1', '#D946EF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
        >
            <StatusBar translucent backgroundColor={'transparent'} />
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Verify Your Email</Text>
                <Text style={styles.subHeader}>
                    A verification link has been sent to:
                </Text>
                <Text style={styles.emailText}>{user?.email}</Text>

                <TouchableOpacity onPress={sendVerificationEmail} style={styles.button}>
                    <View style={styles.gradientButton}>
                        <Text style={styles.buttonText}>
                            {'Resend Email?'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    dispatch(logout());
                }}>
                    <Text style={styles.linkText}>Back to Login</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        ...theme.fonts.h1Style,
        color: theme.colors.white,
        marginBottom: 12,
        textAlign: 'center',
    },
    subHeader: {
        ...theme.fonts.subtitle1Style,
        color: theme.colors.white,
        textAlign: 'center',
    },
    emailText: {
        ...theme.fonts.body1Style,
        color: theme.colors.white,
        marginBottom: 24,
        textAlign: 'center',
    },
    button: {
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.colors.white,
    },
    gradientButton: {
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText: {
        ...theme.fonts.boldStyle,
        color: theme.colors.white,
    },
    linkText: {
        color: theme.colors.white,
        textAlign: 'center',
        marginTop: 16,
        ...theme.fonts.subtitle2Style,
    },
});
