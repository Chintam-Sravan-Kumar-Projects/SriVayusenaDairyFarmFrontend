// storySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { deletehealthEntry, gethealthData, posthealthData, updatehealthEntry } from '../Services/healthServices';

// Async thunk to get health detail by user id;
export const gethealthDetails = createAsyncThunk('health/get', async ({token,value}, { rejectWithValue }) => {
  try {
    const response = await gethealthData(token,value);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to add new health entry in cow account.
export const addhealth = createAsyncThunk('health/add/post', async ({value,token }, { rejectWithValue }) => {
  try {
    const response = await posthealthData(value,token);
    return response;
  } catch (error) {

    return rejectWithValue(error.response.data);
  }
});




// Async thunk to update a health entry by id;
export const updateExistinghealthEntry = createAsyncThunk('health/update:id', async ({ id, payload, token }, { rejectWithValue }) => {
  try {

    const response = await updatehealthEntry(id, payload, token);
    return response;
  } catch (error) {

    return rejectWithValue(error.response.data);
  }
});

// Async thunk to get  health data for a user data
export const fetchStoryById = createAsyncThunk('stories/get/:id', async ({id,token}, { rejectWithValue }) => {
  try {
    const response = await getStoryById({id,token});
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


// Async thunk to delete a health entry by id
export const deleteExistinghealthEntry = createAsyncThunk('stories/deleteExistingStory', async ({ id, token }, { rejectWithValue }) => {
  try {
    const response = await deletehealthEntry(id, token);
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
export const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    //get health data
      .addCase(gethealthDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(gethealthDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        toast.success('records loaded successfully!');
      })
      .addCase(gethealthDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.msg || 'Failed to load user health details!');
      })

      //add new health details
      .addCase(addhealth.pending, (state) => {
        state.loading = true;
      })
      .addCase(addhealth.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(`${action.payload.message}`||'health data added successfully!');
      })
      .addCase(addhealth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        toast.error(action.payload.error || 'Failed to add health data!');
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
      .addCase(updateExistinghealthEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExistinghealthEntry.fulfilled, (state, action) => {
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
      .addCase(updateExistinghealthEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to update entry!');
      })

      //delete story by id
      .addCase(deleteExistinghealthEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExistinghealthEntry.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload; // since it's just the ID
        state.data = state.data.filter((entry) => entry._id !== deletedId);
      })
      
      
      .addCase(deleteExistinghealthEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = "Server error";
        console.error("Delete thunk rejected:", action.payload);
        toast.error(action.payload.message || 'Failed to delete health entry!');
      });
      
  },
});


