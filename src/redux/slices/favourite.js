import { createSlice } from '@reduxjs/toolkit';
import { showToast } from '../../components/utils';
import i18n from '../../i18n';

const initialState = {
    favouriteCaption: [],
};

const favouriteCaptions = createSlice({
    name: 'favouriteCaptions',
    initialState,
    reducers: {
        addFavouriteCaption(state, action) {
            const exists = state.favouriteCaption.find(c => c.id === action.payload.id);
            if (!exists) {
                state.favouriteCaption.push(action.payload);
            }
        },
        removeFavouriteCaption(state, action) {
            state.favouriteCaption = state.favouriteCaption.filter(c => c.id !== action.payload);
            showToast('success', i18n.t('removed'), i18n.t('caption_removed_from_favorites'));
        },
        clearCaptions(state) {
            state.favouriteCaption = [];
        },
    },
});

export const {
    addFavouriteCaption,
    removeFavouriteCaption,
    clearCaptions
} = favouriteCaptions.actions;

export default favouriteCaptions.reducer;
