// backHandlerUtils.js
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function useDisableBackHandler() {
    useEffect(() => {
        const backAction = () => {
            // Returning true means "we have handled the back button" => no going back
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); // Clean up on unmount
    }, []);
}
