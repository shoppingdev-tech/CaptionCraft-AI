import { createSlice } from '@reduxjs/toolkit';
import { generateImageCaptions } from '../api';

const initialState = {
    captions: [],
    loading: false,
    error: null,
};

const captionSlice = createSlice({
    name: 'captions',
    initialState,
    reducers: {
        clearCaptions(state) {
            state.captions = [];
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateImageCaptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateImageCaptions.fulfilled, (state, action) => {
                try {

                    const responseText = action.payload;
                    const start = responseText.indexOf('[');
                    const end = responseText.lastIndexOf(']') + 1;
                    if (start === -1 || end === -1) {
                        state.captions = [];
                    }
                    const jsonString = responseText.slice(start, end);
                    const dataInArray = JSON.parse(jsonString)

                    state.captions = dataInArray;
                } catch {
                    state.error = 'Failed to parse captions.';
                }
                state.loading = false;
            })
            .addCase(generateImageCaptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong.';
            });
    },
});

export const { clearCaptions } = captionSlice.actions;
export default captionSlice.reducer;