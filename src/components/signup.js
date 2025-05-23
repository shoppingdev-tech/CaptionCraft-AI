import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { logScreenView, logEvent } from '../firebaseAnalytics';

import { theme } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/thunk/auth';

export default function SignupScreen({ navigation }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [touched, setTouched] = useState({ username: false, email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const { status } = useSelector((state) => state.auth);

    useEffect(() => {
        // Log screen view when component mounts
        logScreenView('SignupScreen');
    }, []);

    const validateUsername = () => {
        setUsernameValid(username.length >= 3);
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(email));
    };

    const validatePassword = () => {
        setPasswordValid(password.length >= 6);
    };

    const disposableDomains = [
        'yopmail.com',
        'mailinator.com',
        '10minutemail.com',
        'tempmail.com',
        'guerrillamail.com',
        'trashmail.com',
        'getnada.com',
    ];

    const isDisposableEmail = (email) => {
        const domain = email.split('@')[1]?.toLowerCase();
        return disposableDomains.includes(domain);
    };

    const handleSignup = async () => {
        validateUsername();
        validateEmail();
        validatePassword();
        if (isDisposableEmail(email)) {
            setEmailValid(false);
            logEvent('signup_disposable_email_attempt', {
                email: email
            });
            return;
        }
        setTouched({ username: true, email: true, password: true });

        if (!usernameValid || !emailValid || !passwordValid) {
            logEvent('signup_validation_failed', {
                username_valid: usernameValid,
                email_valid: emailValid,
                password_valid: passwordValid
            });
            return;
        }

        logEvent('signup_attempt', {
            email: email,
            username: username
        });

        await dispatch(signupUser({
            email,
            password,
            username,
        }));
    };

    const handleLogin = () => {
        logEvent('login_from_signup_pressed');
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
                <Text style={styles.header}>{t('create_account')}</Text>
                <Text style={styles.subHeader}>{t('sign_up_to_get_started')}</Text>

                <TextInput
                    style={[
                        styles.input,
                        {
                            borderColor:
                                !usernameValid && touched.username ? theme.colors.redError : theme.colors.white,
                        },
                    ]}
                    placeholder={t('username')}
                    placeholderTextColor={theme.colors.placeHolder}
                    value={username}
                    onChangeText={setUsername}
                    onBlur={() => {
                        setTouched((prev) => ({ ...prev, username: true }));
                        validateUsername();
                    }}
                />
                {!usernameValid && touched.username && (
                    <Text style={styles.errorText}>{t('username_required')}</Text>
                )}

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
                    value={email}
                    autoCapitalize="none"
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
                            {
                                borderColor:
                                    !passwordValid && touched.password ? theme.colors.redError : theme.colors.white,
                            },
                        ]}
                        placeholder={t('password')}
                        placeholderTextColor={theme.colors.placeHolder}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        onBlur={() => {
                            setTouched((prev) => ({ ...prev, password: true }));
                            validatePassword();
                        }}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                            name={showPassword ? 'eye-slash' : 'eye'}
                            size={20}
                            color={theme.colors.white}
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                </View>
                {!passwordValid && touched.password && (
                    <Text style={styles.errorText}>{t('password_required')}</Text>
                )}
                <TouchableOpacity onPress={handleSignup} style={styles.button}>
                    <View style={styles.gradientButton}>
                        {status == 'loading' ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>{t('sign_up')}</Text>
                        )}
                    </View>
                </TouchableOpacity>
                <View style={styles.footerTextWrap}>
                    <Text style={styles.footerText}>{t('already_have_account')} </Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.linkText}>{t('login')}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        height: '100%'
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
        width: '100%',
    },
    errorText: {
        color: theme.colors.redError,
        marginBottom: 8,
        ...theme.fonts.captionStyle,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    eyeIcon: {
        position: 'absolute',
        right: 14,
        top: -14,
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
    footerTextWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        ...theme.fonts.body2Style,
        color: theme.colors.white,
    },
    linkText: {
        color: theme.colors.white,
        ...theme.fonts.subtitle2Style,
    },
});
