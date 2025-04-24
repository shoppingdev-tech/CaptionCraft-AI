import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { theme } from '../theme';

export default function OTPScreen({ navigation }) {
    const [otp, setOtp] = useState('');
    const [otpValid, setOtpValid] = useState(true);
    const [touched, setTouched] = useState({ otp: false });

    const validateOtp = () => {
        setOtpValid(otp.length === 6); // Assuming OTP is 6 digits long
    };

    const handleVerifyOtp = () => {
        validateOtp();
        setTouched({ otp: true });

        if (!otpValid) {
            return;
        }

        // Perform OTP verification logic here
        alert('OTP Verified!');
        navigation.navigate('Login');
    };

    return (
        <LinearGradient
            colors={['#6366F1', '#D946EF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
        >
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Enter OTP</Text>
                <Text style={styles.subHeader}>Please enter the OTP sent to your email</Text>

                <TextInput
                    style={[
                        styles.input,
                        {
                            borderColor:
                                !otpValid && touched.otp ? '#DC2626' : theme.colors.white,
                        },
                    ]}
                    placeholder="Enter OTP"
                    placeholderTextColor={theme.colors.white}
                    keyboardType="numeric"
                    value={otp}
                    onChangeText={setOtp}
                    onBlur={() => {
                        setTouched((prev) => ({ ...prev, otp: true }));
                        validateOtp();
                    }}
                />
                {!otpValid && touched.otp && (
                    <Text style={styles.errorText}>OTP must be 6 digits</Text>
                )}

                <TouchableOpacity onPress={handleVerifyOtp} style={styles.button}>
                    <View style={styles.gradientButton}>
                        <Text style={styles.buttonText}>Verify OTP</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.linkText}>Resend OTP</Text>
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
