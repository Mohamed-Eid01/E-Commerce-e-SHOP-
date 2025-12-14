import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice.jsx';
import productSlice from './productSlice.jsx';

export const store =
configureStore({
    reducer:
{
    cart:cartSlice,
    product:productSlice,
}})

export default store;