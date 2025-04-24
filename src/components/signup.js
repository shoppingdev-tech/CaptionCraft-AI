import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { theme } from '../theme';

export default function SignupScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [touched, setTouched] = useState({ username: false, email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);

    const validateUsername = () => {
        setUsernameValid(username.length > 0);
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(email));
    };

    const validatePassword = () => {
        setPasswordValid(password.length >= 6);
    };

    const handleSignup = () => {
        validateUsername();
        validateEmail();
        validatePassword();
        setTouched({ username: true, email: true, password: true });

        if (!usernameValid || !emailValid || !passwordValid) {
            return;
        }

        // Perform signup logic here
    };

    return (
        <LinearGradient
            colors={['#6366F1', '#D946EF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
        >
            <StatusBar translucent backgroundColor={'transparent'} />
            <KeyboardAwareScrollView  contentContainerStyle={styles.container}>
                    <Text style={styles.header}>Create Account</Text>
                    <Text style={styles.subHeader}>Sign up to get started</Text>

                    <TextInput
                        style={[
                            styles.input,
                            {
                                borderColor:
                                    !usernameValid && touched.username ? theme.colors.redError : theme.colors.white,
                            },
                        ]}
                        placeholder="Username"
                        placeholderTextColor={theme.colors.white}
                        value={username}
                        onChangeText={setUsername}
                        onBlur={() => {
                            setTouched((prev) => ({ ...prev, username: true }));
                            validateUsername();
                        }}
                    />
                    {!usernameValid && touched.username && (
                        <Text style={styles.errorText}>Username is required</Text>
                    )}

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
                        <Text style={styles.errorText}>Password must be at least 6 characters</Text>
                    )}

                    <TouchableOpacity onPress={handleSignup} style={styles.button}>
                        <View style={styles.gradientButton}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.footerTextWrap}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.linkText}>Login</Text>
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
