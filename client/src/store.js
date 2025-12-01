import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './features/UserSlice';
import PostReducer from './features/PostSlice';
import ProductReducer from './features/ProductSlice'; // added

export const store = configureStore({
    reducer: {
        users: UserReducer,
        posts: PostReducer,
        products: ProductReducer // added
    }
});