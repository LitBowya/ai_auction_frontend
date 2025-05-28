import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    auctionPrice: null,
    auction: null
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.auctionPrice = action.payload.auctionPrice;
            state.auction = action.payload.auction;
        },
        clearOrder: () => initialState,
    },
});

export const {setOrder, clearOrder} = orderSlice.actions;
export default orderSlice.reducer;
