import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], // Array of cart items: [{id, name, price, img, category, quantity}]
    totalItems: 0,
    totalPrice: 0
};

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, name, price, img, category } = action.payload;

            // Check if item already exists in cart
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                // If exists, increment quantity
                existingItem.quantity += 1;
            } else {
                // If new, add to cart with quantity 1
                state.items.push({
                    id,
                    name,
                    price,
                    img,
                    category,
                    quantity: 1
                });
            }

            // Recalculate totals
            state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);

            // Recalculate totals
            state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },

        incrementQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item) {
                item.quantity += 1;

                // Recalculate totals
                state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            }
        },

        decrementQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item && item.quantity > 1) {
                item.quantity -= 1;

                // Recalculate totals
                state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        }
    }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
