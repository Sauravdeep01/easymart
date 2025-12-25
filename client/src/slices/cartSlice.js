import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: {}, paymentMethod: 'Credit Card' };

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            
            // Ensure required fields
            if (!item._id || !item.name || !item.price) {
                console.error('Invalid cart item:', item);
                return;
            }

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                // Update quantity if item already exists
                existItem.qty = item.qty || existItem.qty + 1;
            } else {
                // Add new item
                const cartItem = {
                    _id: item._id,
                    name: item.name,
                    image: item.image || item.images?.[0],
                    price: Number(item.price),
                    countInStock: item.countInStock || 0,
                    qty: item.qty || 1,
                    brand: item.brand,
                    category: item.category
                };
                state.cartItems.push(cartItem);
            }

            // Calculate prices
            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
            state.totalPrice = addDecimals(
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            );

            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            
            // Recalculate prices
            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
            state.totalPrice = addDecimals(
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            );

            localStorage.setItem('cart', JSON.stringify(state));
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCartItems: (state) => {
            state.cartItems = [];
            state.itemsPrice = '0.00';
            state.shippingPrice = '0.00';
            state.taxPrice = '0.00';
            state.totalPrice = '0.00';
            localStorage.setItem('cart', JSON.stringify(state));
        }
    }
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
