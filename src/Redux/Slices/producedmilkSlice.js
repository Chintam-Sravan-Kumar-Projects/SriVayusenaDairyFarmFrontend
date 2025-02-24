// storySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { deleteproducedmilkEntry, getproducedmilkData, postproducedmilkData, updateproducedmilkEntry } from '../Services/producedmilkServices';

// Async thunk to get milk detail by user id;
export const getproducedmilkDetails = createAsyncThunk('producedmilk/get', async ({token,value}, { rejectWithValue }) => {
  try {
    const response = await getproducedmilkData(token,value);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to add new producedmilk entry in customer account.
export const addproducedmilk = createAsyncThunk('producedmilk/add/post', async ({value,token }, { rejectWithValue }) => {
  try {
    const response = await postproducedmilkData(value,token);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});




// Async thunk to update a producedmilk entry by id;
export const updateExistingproducedmilkEntry = createAsyncThunk('producedmilk/update:id', async ({ id, payload, token }, { rejectWithValue }) => {
  try {
    const response = await updateproducedmilkEntry(id, payload, token);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to get  producedmilk data for a user data
export const fetchStoryById = createAsyncThunk('stories/get/:id', async ({id,token}, { rejectWithValue }) => {
  try {
    const response = await getStoryById({id,token});
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


// Async thunk to delete a producedmilk entry by id
export const deleteExistingproducedmilkEntry = createAsyncThunk('stories/deleteExistingStory', async ({ id, token }, { rejectWithValue }) => {
  try {
    const response = await deleteproducedmilkEntry(id, token);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Initial state
const initialState = {
  data:[],
  loading: false,
  error: null,
};

// Story slice
export const producedmilkSlice = createSlice({
  name: 'producedmilk',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    //get producedmilk data
      .addCase(getproducedmilkDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getproducedmilkDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        toast.success('records loaded successfully!');
      })
      .addCase(getproducedmilkDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.msg || 'Failed to load cow milk details!');
      })

      //add new producedmilk details
      .addCase(addproducedmilk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addproducedmilk.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(`${action.payload.message}`||'milk data added successfully!');
      })
      .addCase(addproducedmilk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        toast.error(action.payload.error || 'Failed to add milk data!');
      })



      //get sotry data by id
      .addCase(fetchStoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.story = action.payload;
        toast.success('Story loaded successfully!');
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || 'Failed to load story!');
      })


      //update story, add contribuiton in the story
      .addCase(updateExistingproducedmilkEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExistingproducedmilkEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.data=state.data.map((entry)=>{
          if(entry._id==action.payload.data._id)
          {
            return action.payload.data;
          }
          else
          {
            return entry;
          }
        })
        toast.success('entry updated successfully!');
      })
      .addCase(updateExistingproducedmilkEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to update entry!');
      })

      //delete story by id
      .addCase(deleteExistingproducedmilkEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExistingproducedmilkEntry.fulfilled, (state, action) => {

        state.loading = false;
        state.data = state.data.filter((entry) => entry._id !== action.payload);
        toast.success('Entry deleted successfully!');
      })
      .addCase(deleteExistingproducedmilkEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = "Server error";
        toast.error(action.payload.message || 'Failed to delete milk entry!');
      });
  },
});


