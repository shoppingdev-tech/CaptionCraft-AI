import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { theme } from '../theme';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [touched, setTouched] = useState({ email: false });

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(email));
    };

    const handleResetPassword = () => {
        validateEmail();
        setTouched({ email: true });

        if (!emailValid) {
            return;
        }

        // Perform password reset logic here
        alert('Password reset email sent!');
        navigation.navigate('Login');
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
                <Text style={styles.header}>Forgot Password</Text>
                <Text style={styles.subHeader}>Enter your email to reset password</Text>

                <TextInput
                    style={[
                        styles.input,
                        {
                            borderColor:
                                !emailValid && touched.email ? '#DC2626' : theme.colors.white,
                        },
                    ]}
                    placeholder="Email"
                    placeholderTextColor={theme.colors.white}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={() => {
                        setTouched((prev) => ({ ...prev, email: true }));
                        validateEmail();
                    }}
                />
                {!emailValid && touched.email && (
                    <Text style={styles.errorText}>Please enter a valid email</Text>
                )}

                <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
                    <View style={styles.gradientButton}>
                        <Text style={styles.buttonText}>Reset Password</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
        marginBottom: 8,
    },
    subHeader: {
        ...theme.fonts.subtitle1Style,
        color: theme.colors.white,
        marginBottom: 24,
    },
    input: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        padding: 14,
        marginBottom: 8,
        borderWidth: 1,
        ...theme.fonts.body1Style,
        color: theme.colors.white,
    },
    errorText: {
        color: '#F87171',
        marginBottom: 8,
        ...theme.fonts.captionStyle,
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
        color: theme.colors.white,
        ...theme.fonts.boldStyle,
    },
    linkText: {
        color: theme.colors.white,
        textAlign: 'center',
        marginTop: 16,
        ...theme.fonts.subtitle2Style,
    },
});
