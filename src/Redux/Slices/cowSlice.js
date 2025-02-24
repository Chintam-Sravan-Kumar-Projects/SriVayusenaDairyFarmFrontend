import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewcow, deletecow, fetchcows } from "../Services/cowServices";
import { toast } from "react-toastify";

// service methods
export const addcow = createAsyncThunk('/add/cow', async ({value,token},{rejectWithValue}) =>{
    try {
        const response =await addNewcow(value,token);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


// fetch cow details
export const getcowsDetails = createAsyncThunk('/get/cow', async (token,{rejectWithValue}) =>{
    try {
        const response =await fetchcows(token);
      
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const DeletecowAccount = createAsyncThunk('/delete/cow', async ({id,token},{rejectWithValue}) =>{
    try {
        const response =await deletecow(id,token);
       
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

//Note : Do NOT MODIFY the intial state structure
const initialState={
    cowData:[],
    loading:false,
    error:null,
    status:null,
    
}
export const cowSlice =createSlice({
    name:"cow",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder

        // add new faramer
        .addCase(addcow.pending, (state)=>{
            state.loading=true;
        })

        .addCase(addcow.fulfilled , (state,action)=>{
            state.loading=false;
            toast.success(action.payload.msg || "cow added successfully");
        })

        .addCase(addcow.rejected , (state,action)=>{
            state.loading=false;
            state.error=true;
            state.status=action.payload.error;
            toast.error(action.payload.error || "Something wen't wrong");
           

        })


        //get cow details
        .addCase(getcowsDetails.pending , (state)=>{
            state.loading=true;

        })

        .addCase(getcowsDetails.fulfilled, (state,action)=>{
            state.loading=false;
            state.cowData=action.payload.cows;
            toast.success(action.payload.message || "fetched cows data")
        })

        .addCase(getcowsDetails.rejected, (state,action)=>{
            
            state.loading=false;
            state.error=true;
            state.status=action.error.message;
            toast.error(action.payload.error|| "Server error...")
            
        })

        //delete cow 
        .addCase(DeletecowAccount.pending, (state)=>{
            state.loading=true;
        })

        .addCase(DeletecowAccount.fulfilled , (state,action)=>{
            
            state.loading=false;
            state.cowData=state.cowData.filter((cow)=>cow._id !== action.payload.id)
            
            toast.success(action.payload.message || "cow account deleted");
        })

        .addCase(DeletecowAccount.rejected , (state,action)=>{
            
            state.loading=false;
            state.error=true;
            state.status=action.error || true;
            toast.error(action.error || "Something wen't wrong");
          

        })
        
    }

})