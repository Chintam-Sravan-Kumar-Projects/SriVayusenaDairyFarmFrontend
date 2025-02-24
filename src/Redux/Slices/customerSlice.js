import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewcustomer, deletecustomer, fetchcustomers } from "../Services/customerServices";
import { toast } from "react-toastify";

// service methods
export const addcustomer = createAsyncThunk('/add/customer', async ({value,token},{rejectWithValue}) =>{
    try {
        const response =await addNewcustomer(value,token);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


// fetch customer details
export const getcustomersDetails = createAsyncThunk('/get/customer', async (token,{rejectWithValue}) =>{
    try {
        const response =await fetchcustomers(token);
      
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const DeletecustomerAccount = createAsyncThunk('/delete/customer', async ({id,token},{rejectWithValue}) =>{
    try {
        const response =await deletecustomer(id,token);
       
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

//Note : Do NOT MODIFY the intial state structure
const initialState={
    customerData:[],
    loading:false,
    error:null,
    status:null,
    
}
export const customerSlice =createSlice({
    name:"customer",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder

        // add new faramer
        .addCase(addcustomer.pending, (state)=>{
            state.loading=true;
        })

        .addCase(addcustomer.fulfilled , (state,action)=>{
            state.loading=false;
            toast.success(action.payload.msg || "farmed added successfully");
        })

        .addCase(addcustomer.rejected , (state,action)=>{
            state.loading=false;
            state.error=true;
            state.status=action.payload.error;
            toast.error(action.payload.error || "Something wen't wrong");
           

        })


        //get customer details
        .addCase(getcustomersDetails.pending , (state)=>{
            state.loading=true;

        })

        .addCase(getcustomersDetails.fulfilled, (state,action)=>{
            state.loading=false;
            state.customerData=action.payload.customers;
            toast.success(action.payload.message || "fetched customers data")
        })

        .addCase(getcustomersDetails.rejected, (state,action)=>{
            
            state.loading=false;
            state.error=true;
            state.status=action.error.message;
            toast.error(action.payload.error|| "Server error...")
            
        })

        //delete customer 
        .addCase(DeletecustomerAccount.pending, (state)=>{
            state.loading=true;
        })

        .addCase(DeletecustomerAccount.fulfilled , (state,action)=>{
            
            state.loading=false;
            state.customerData=state.customerData.filter((customer)=>customer._id !== action.payload.id)
            
            toast.success(action.payload.message || "farmed account deleted");
        })

        .addCase(DeletecustomerAccount.rejected , (state,action)=>{
            
            state.loading=false;
            state.error=true;
            state.status=action.error || true;
            toast.error(action.error || "Something wen't wrong");
          

        })
        
    }

})