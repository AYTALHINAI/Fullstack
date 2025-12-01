import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
export const getUser = createAsyncThunk(
  "users/getUser",
  async (udata, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/login", udata);
      return response.data; 
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed.";
      return rejectWithValue(msg);
    }
  }
);
*/

export const savePost = createAsyncThunk(
  "posts/savePost",
  async (pdata, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/savePost", pdata);
      return response.data.message; 
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Registration failed.";
      return rejectWithValue(msg); 
    }
  }
);

const initVal = {
  posts: [],
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const PostSlice = createSlice({
  name: "posts",
  initialState: initVal,
  extraReducers: (builder) => {
    builder
      
      .addCase(savePost.pending, (state) => {
        state.isLoading = true;
        
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload; 
      })
      .addCase(savePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user || {};
        state.message = action.payload.message || "Success";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Login failed.";
      });
      */
  }
});

export default PostSlice.reducer;
