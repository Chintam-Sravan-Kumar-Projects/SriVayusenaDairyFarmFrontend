// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './Slices/authSlice';
import { milkSlice } from './Slices/milkSlice';
import { customerSlice } from './Slices/customerSlice';
import { rateSlice } from './Slices/rateSlice';
import { cowSlice } from './Slices/cowSlice';
import { producedmilkSlice } from './Slices/producedmilkSlice';
import { expenseSlice } from './Slices/expensesSlice';
import { healthSlice } from './Slices/healthSlice';

const authReducer=authSlice.reducer;
const milkReducer=milkSlice.reducer;
const customerReducer=customerSlice.reducer;
const rateReducer = rateSlice.reducer;
const cowReducer=cowSlice.reducer;
const producedmilkReducer=producedmilkSlice.reducer;
const expenseReducer=expenseSlice.reducer;
const healthReducer=healthSlice.reducer;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    milk: milkReducer,
    rate: rateReducer,
    cow: cowReducer,
    producedmilk: producedmilkReducer,
    expense: expenseReducer,
    health: healthReducer,
  },
});
