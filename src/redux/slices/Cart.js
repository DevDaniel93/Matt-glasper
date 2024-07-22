import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'Cart',
    initialState: {
        cart: []
    },
    reducers: {
        addCart: (state, action) => {
            const existingProductIndex = state.cart.findIndex(
                item => item.id === action.payload.id
            );
            if (existingProductIndex !== -1) {
                // Update the existing product
                state.cart[existingProductIndex] = {
                    ...state.cart[existingProductIndex],
                    ...action.payload,
                    // quantity: state.cart[existingProductIndex].quantity + action.payload.quantity
                };
            } else {
                // Add new product
                state.cart.push(action.payload);
            }
        },
        emptyCart: (state, action) => {
            state.cart = []
        },
        removeCartItem: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        updateCartItem: (state, action) => {
            const existingProductIndex = state.cart.findIndex(
                item => item.id === action.payload.id
            );
            if (existingProductIndex !== -1) {
                // Update the existing product
                state.cart[existingProductIndex] = {
                    ...state.cart[existingProductIndex],
                    ...action.payload
                };
            }
        }

    },
});

export const { addCart, emptyCart, removeCartItem, updateCartItem } = cartSlice.actions;
export const selectTotalAmount = state =>
    state.Cart.cart.reduce((total, item) => total + item.price * item.quantity, 0);
export default cartSlice.reducer;