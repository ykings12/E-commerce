import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice"; // Importing API slice from your project
import authReducer from './auth/authSlice'; // Importing auth reducer
import favoritesReducer from "./favorites/favoriteSlice";
import { getFavoritesFromLocalStorage } from "../../Utils/localStorage"; // Corrected path to localStorage.js
import cartSliceReducer from "./cart/cartSlice";
import shopReducer from "../shop/shopSlice";

const initialFavorites = getFavoritesFromLocalStorage() || [];

// Configure the Redux store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Adding API slice reducer to the store
    auth: authReducer, // Adding auth reducer to the store under 'auth' key
    favorites: favoritesReducer, // Adding favorites reducer to the store
    cart:cartSliceReducer,
    shop:shopReducer,
  },
  preloadedState: {
    favorites: initialFavorites, // Providing preloaded state for the 'favorites' slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Adding API middleware to handle data fetching
  devTools: true, // Enable Redux DevTools extension for debugging
});

// Set up listeners for Redux Toolkit query actions
setupListeners(store.dispatch);

export default store; // Export the configured Redux store
