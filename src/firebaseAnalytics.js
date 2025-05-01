// utils/firebaseAnalytics.js
import analytics from '@react-native-firebase/analytics';
import DeviceInfo from 'react-native-device-info';

// Automatically disable analytics in debug mode
const isAnalyticsEnabled = !__DEV__;

const getDefaultParams = async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    const deviceOS = DeviceInfo.getSystemName(); // Android
    const appVersion = DeviceInfo.getVersion();
    const osVersion = DeviceInfo.getSystemVersion();
    const brand = DeviceInfo.getBrand();
    const model = DeviceInfo.getModel();

    return {
        device_id: deviceId,
        device_os: deviceOS,
        os_version: osVersion,
        app_version: appVersion,
        brand,
        model,
    };
};

// Log a generic event
export const logEvent = async (eventName, params = {}) => {
    if (!isAnalyticsEnabled) return;
    try {
        const defaultParams = await getDefaultParams();
        const combinedParams = { ...defaultParams, ...params };
        await analytics().logEvent(eventName, combinedParams);
    } catch (error) {
        console.warn('Analytics logEvent error:', error);
    }
};

// Log screen view
export const logScreenView = async (screenName, className = null) => {
    if (!isAnalyticsEnabled) return;
    try {
        await analytics().logScreenView({
            screen_name: screenName,
            screen_class: className || screenName,
        });
    } catch (error) {
        console.warn('Analytics logScreenView error:', error);
    }
};

// Set user ID
export const setUserId = async (userId) => {
    if (!isAnalyticsEnabled) return;
    try {
        await analytics().setUserId(userId);
    } catch (error) {
        console.warn('Analytics setUserId error:', error);
    }
};

// Set user properties
export const setUserProperty = async (name, value) => {
    if (!isAnalyticsEnabled) return;
    try {
        await analytics().setUserProperty(name, value);
    } catch (error) {
        console.warn('Analytics setUserProperty error:', error);
    }
};
