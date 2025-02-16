// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './Slices/authSlice';
import { milkSlice } from './Slices/milkSlice';
import { customerSlice } from './Slices/customerSlice';
import { rateSlice } from './Slices/rateSlice';

const authReducer=authSlice.reducer;
const milkReducer=milkSlice.reducer;
const customerReducer=customerSlice.reducer;
const rateReducer = rateSlice.reducer;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    milk: milkReducer,
    rate: rateReducer,
    
  },
});
