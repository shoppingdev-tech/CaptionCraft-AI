import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next';
import { logScreenView, logEvent } from '../firebaseAnalytics';

import { theme } from '../theme';
import { styles } from '../styles/login';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/thunk/auth';

export default function LoginScreen({ navigation }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [touched, setTouched] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const { status } = useSelector((state) => state.auth);

    useEffect(() => {
        // Log screen view when component mounts
        logScreenView('LoginScreen');
    }, []);

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
            logEvent('login_validation_failed', {
                email_valid: emailValid,
                password_valid: passwordValid
            });
            return;
        }
        logEvent('login_attempt', {
            email: email
        });
        dispatch(loginUser({ email, password }));
    };

    const handleForgotPassword = () => {
        logEvent('forgot_password_pressed');
        navigation.navigate('Forgot');
    };

    const handleSignup = () => {
        logEvent('signup_pressed');
        navigation.navigate('Signup');
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
                <Text style={styles.header}>{t('welcome_back')}</Text>
                <Text style={styles.subHeader}>{t('login_to_account')}</Text>

                <TextInput
                    style={[
                        styles.input,
                        {
                            borderColor:
                                !emailValid && touched.email ? theme.colors.redError : theme.colors.white,
                        },
                    ]}
                    placeholder={t('email')}
                    placeholderTextColor={theme.colors.placeHolder}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={() => {
                        setTouched((prev) => ({ ...prev, email: true }));
                        validateEmail();
                    }}
                />
                {!emailValid && touched.email && (
                    <Text style={styles.errorText}>{t('valid_email')}</Text>
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
                        placeholder={t('password')}
                        autoCapitalize="none"
                        placeholderTextColor={theme.colors.placeHolder}
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
                    <Text style={styles.errorText}>{t('password_required')}</Text>
                )}

                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotText}>{t('forgot_password')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <View style={styles.gradientButton}>
                        {status == 'loading' ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>{t('login')}</Text>
                        )}
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.googleButton}>
                        <Icon name="google" size={20} color="#FFFFFF" style={styles.googleIcon} />
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </TouchableOpacity> */}

                <View style={styles.footerTextWrap}>
                    <Text style={styles.footerText}>{t('dont_have_account')} </Text>
                    <TouchableOpacity onPress={handleSignup}>
                        <Text style={styles.linkText}>{t('sign_up')}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </LinearGradient>
    );
}