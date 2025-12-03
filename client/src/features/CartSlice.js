import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

// Async thunks for cart operations
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${email}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch cart");
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ email, item }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/add`, { email, item });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to add item");
        }
    }
);

export const updateCartQuantity = createAsyncThunk(
    "cart/updateQuantity",
    async ({ email, productId, action }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/update`, { email, productId, action });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to update quantity");
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ email, productId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/remove`, { data: { email, productId } });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to remove item");
        }
    }
);

export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/clear/${email}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to clear cart");
        }
    }
);

const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isLoading: false,
    isError: false,
    message: ""
};

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items.map(item => ({
                    id: item.productId,
                    name: item.name,
                    price: item.price,
                    img: item.img,
                    category: item.category,
                    quantity: item.quantity
                }));
                state.totalItems = action.payload.totalItems;
                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items.map(item => ({
                    id: item.productId,
                    name: item.name,
                    price: item.price,
                    img: item.img,
                    category: item.category,
                    quantity: item.quantity
                }));
                state.totalItems = action.payload.totalItems;
                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Update Quantity
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.items = action.payload.items.map(item => ({
                    id: item.productId,
                    name: item.name,
                    price: item.price,
                    img: item.img,
                    category: item.category,
                    quantity: item.quantity
                }));
                state.totalItems = action.payload.totalItems;
                state.totalPrice = action.payload.totalPrice;
            })

            // Remove from Cart
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload.items.map(item => ({
                    id: item.productId,
                    name: item.name,
                    price: item.price,
                    img: item.img,
                    category: item.category,
                    quantity: item.quantity
                }));
                state.totalItems = action.payload.totalItems;
                state.totalPrice = action.payload.totalPrice;
            })

            // Clear Cart
            .addCase(clearCart.fulfilled, (state, action) => {
                state.items = [];
                state.totalItems = 0;
                state.totalPrice = 0;
            });
    }
});

export const { resetCart } = CartSlice.actions;
export default CartSlice.reducer;
