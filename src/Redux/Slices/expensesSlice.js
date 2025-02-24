import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { 
  deleteexpenseEntry, 
  getexpenseData, 
  postexpenseData, 
  updateexpenseEntry 
} from "../Services/expensesServices";

// **1. Fetch Expense Details**
export const getexpenseDetails = createAsyncThunk(
  "expense/get", 
  async ({ token}, { rejectWithValue }) => {
    try {
      const response = await getexpenseData(token);
 
      if (!response || !response.data) {
        console.error("Invalid API response structure", response);
        return rejectWithValue({ msg: "Invalid API response structure" });
      }
      return response.data; 
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || { msg: "Unknown Error" });
    }
  }
);

// **2. Add New Expense**
export const addexpense = createAsyncThunk(
  "expense/add/post", 
  async ({ value, token }, { rejectWithValue }) => {
    try {

      const response = await postexpenseData(value, token);
      
      if (!response || !response.expense) {
        return rejectWithValue({ msg: "Invalid API response structure" });
      }
      return response;
    } catch (error) {
      console.error("Add Expense Error:", error);
      return rejectWithValue(error.response?.data || { msg: "Failed to add expense" });
    }
  }
);

// **3. Update Existing Expense**
export const updateExistingexpenseEntry = createAsyncThunk(
  "expense/update", 
  async ({ id, payload, token }, { rejectWithValue }) => {
    try {
      const response = await updateexpenseEntry(id,payload, token);
      return response.data;
    } catch (error) {
      console.error("Update Expense Error:", error);
      return rejectWithValue(error.response?.data || { msg: "Failed to update expense" });
    }
  }
);

// **4. Delete Expense**
export const deleteExistingexpenseEntry = createAsyncThunk(
  "expense/delete", 
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await deleteexpenseEntry(id, token);
      return id;
    } catch (error) {
      console.error("Delete Expense Error:", error);
      return rejectWithValue(error.response?.data || { msg: "Failed to delete expense" });
    }
  }
);

// **Initial State**
const initialState = {
  data: [],  // Ensure `data` is an array
  expenseData: [], 
  loading: false,
  error: null,
};

// **Expense Slice**
export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // **Fetching Expenses**
      .addCase(getexpenseDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getexpenseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
        state.expenseData = action.payload || [];
        toast.success("Records loaded successfully!");
      })
      .addCase(getexpenseDetails.rejected, (state, action) => {
        console.error("Failed to fetch expense details:", action.payload);
        state.loading = false;
        state.error = action.payload?.msg || "Failed to load expense details!";
        toast.error(state.error);
      })

      // **Adding Expenses**
      .addCase(addexpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(addexpense.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload]; 
        state.expenseData = [...state.expenseData, action.payload]; 
        toast.success("Expense data added successfully!");
      })      
      .addCase(addexpense.rejected, (state, action) => {
        console.error("Failed to add expense:", action.payload);
        state.loading = false;
        state.error = action.payload?.msg || "Failed to add expense!";
        toast.error(state.error);
      })

      // **Updating Expenses**
      .addCase(updateExistingexpenseEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExistingexpenseEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((entry) => 
          entry._id === action.payload._id ? action.payload : entry
        );
        state.expenseData = state.expenseData.map((entry) => 
          entry._id === action.payload._id ? action.payload : entry
        );
        toast.success("Entry updated successfully!");
      })
      .addCase(updateExistingexpenseEntry.rejected, (state, action) => {
        console.error("Failed to update expense:", action.payload);
        state.loading = false;
        state.error = action.payload?.msg || "Failed to update expense!";
        toast.error(state.error);
      })

      // **Deleting Expenses**
      .addCase(deleteExistingexpenseEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExistingexpenseEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((entry) => entry._id !== action.payload);
        state.expenseData = state.expenseData.filter((entry) => entry._id !== action.payload);
        toast.success("Entry deleted successfully!");
      })
      .addCase(deleteExistingexpenseEntry.rejected, (state, action) => {
        console.error("Failed to delete expense:", action.payload);
        state.loading = false;
        state.error = action.payload?.msg || "Failed to delete expense!";
        toast.error(state.error);
      });
  },
});

export default expenseSlice.reducer;
