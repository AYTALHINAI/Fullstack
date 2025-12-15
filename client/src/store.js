import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './features/UserSlice';
import ProductReducer from './features/ProductSlice'; 
import CartReducer from './features/CartSlice';

export const store = configureStore({
    reducer: {
        users: UserReducer,
        products: ProductReducer, 
        cart: CartReducer
    }
});