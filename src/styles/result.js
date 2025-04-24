import {

    StyleSheet,
} from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    title: {
        ...theme.fonts.h2Style,
        color: theme.colors.textPrimary,
    },
    image: {
        height: 200,
        borderRadius: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    list: {
        paddingHorizontal: 16,
        gap: 12,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.lightGray,
        borderRadius: 16,
        padding: 12,
        gap: 10,
        marginBottom: 20,
    },
    emoji: {
        fontSize: 20,
        marginTop: 4,
    },
    captionContent: {
        flex: 1,
    },
    captionText: {
        ...theme.fonts.subtitle1Style,
        color: theme.colors.textPrimary,
    },
    tags: {
        ...theme.fonts.body2Style,
        color: theme.colors.primary,
        marginTop: 4,
    },
});