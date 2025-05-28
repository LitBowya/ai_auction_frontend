// features/shipping/shippingSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    shippingOptions: [],
    selectedShipping: null,
    isDefaultLoaded: false,
};

const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        setShippingOptions: (state, action) => {
            state.shippingOptions = action.payload;
            // Auto-select default shipping if not already selected
            const defaultShipping = action.payload.find(option => option.isDefault);
            if (defaultShipping && !state.selectedShipping) {
                state.selectedShipping = defaultShipping._id;
            }
        },
        selectShipping: (state, action) => {
            state.selectedShipping = action.payload;
        },
        addNewShipping: (state, action) => {
            state.shippingOptions.push(action.payload);
        },
        resetShipping: () => initialState,
    },
});

export const {setShippingOptions, selectShipping, addNewShipping, resetShipping} = shippingSlice.actions;

export default shippingSlice.reducer;
