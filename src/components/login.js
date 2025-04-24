import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { theme } from '../theme';
import { styles } from '../styles/login';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [touched, setTouched] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(email));
    };

    const validatePassword = () => {
        setPasswordValid(password.length >= 6);
    };

    const handleLogin = () => {
        validateEmail();
        validatePassword();
        setTouched({ email: true, password: true });

        if (!emailValid || !passwordValid) {
            return;
        }

        // Perform login logic here
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
                    <Text style={styles.header}>Welcome Back</Text>
                    <Text style={styles.subHeader}>Login to your account</Text>

                    <TextInput
                        style={[
                            styles.input,
                            {
                                borderColor:
                                    !emailValid && touched.email ? theme.colors.redError : theme.colors.white,
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

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                styles.passwordInput,
                                {
                                    borderColor:
                                        !passwordValid && touched.password ? theme.colors.redError : theme.colors.white,
                                },
                            ]}
                            placeholder="Password"
                            placeholderTextColor={theme.colors.white}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                            onBlur={() => {
                                setTouched((prev) => ({ ...prev, password: true }));
                                validatePassword();
                            }}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Icon
                                name={showPassword ? 'eye-slash' : 'eye'}
                                size={20}
                                color={theme.colors.white}
                            />
                        </TouchableOpacity>
                    </View>
                    {!passwordValid && touched.password && (
                        <Text style={styles.errorText}>Password must be at least 6 characters</Text>
                    )}

                    <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <View style={styles.gradientButton}>
                            <Text style={styles.buttonText}>Login</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.googleButton}>
                        <Icon name="google" size={20} color="#FFFFFF" style={styles.googleIcon} />
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </TouchableOpacity>

                    <View style={styles.footerTextWrap}>
                        <Text style={styles.footerText}>Don’t have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.linkText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
        </LinearGradient>
    );
}