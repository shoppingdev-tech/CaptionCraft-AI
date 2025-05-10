// store/authSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { showToast } from '../../components/utils';
import { setUserId, setUserProperty } from '../../firebaseAnalytics';

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ email, password, username }, { rejectWithValue }) => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const { uid } = userCredential.user;

            await userCredential.user.sendEmailVerification();

            const userData = {
                id: uid,
                email,
                username,
                token: 50,
                isVerified: false,
                plan: 'FREE',
                isAddFree: false,
                createdDate: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp(),
            };

            await firestore().collection('users').doc(uid).set(userData);
            
            // Set analytics user ID and properties
            await setUserId(uid);
            await setUserProperty('user_plan', 'FREE');
            await setUserProperty('is_verified', 'false');
            
            showToast('success', 'Registration Success', 'Your account has been created.');
            return userData;
        } catch (error) {
            const errorMessage = error?.message || 'Please try again or check your details.';
            showToast('error', 'Registration Failed', errorMessage);
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const { uid } = userCredential.user;

            const userDoc = await firestore().collection('users').doc(uid).get();
            const userData = userDoc.data();

            // Set analytics user ID and properties
            await setUserId(uid);
            await setUserProperty('user_plan', userData?.plan || 'FREE');
            await setUserProperty('is_verified', userData?.isVerified ? 'true' : 'false');

            showToast('success', 'Login Successful', 'Welcome back!');

            return {
                ...userData,
                isVerified: userData?.isVerified || false,
            };
        } catch (error) {
            const errorMessage = error?.message || 'Invalid email or password.';
            showToast('error', 'Login Failed', errorMessage);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCurrentDetails = createAsyncThunk(
    'auth/fetchCurrentDetails',
    async ({ uid }, { rejectWithValue }) => {
        try {
            const userDoc = await firestore().collection('users').doc(uid).get();
            const userData = userDoc.data();
            return userData;
        } catch (error) {
            const errorMessage = error?.message || 'Please try again or check your details.';
            showToast('error', 'Registration Failed', errorMessage);
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await auth().signOut();
    showToast('success', 'Logged Out', 'You have been successfully logged out.');
    return true;
});
