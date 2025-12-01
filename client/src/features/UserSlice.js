import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const addUser = createAsyncThunk(
  "users/addUser",
  async (udata, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/register", udata);
      return response.data.message; 
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Registration failed.";
      return rejectWithValue(msg); 
    }
  }
);

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put("http://localhost:5000/updateProfile", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Profile update failed");
    }
  }
);


const initVal = {
  user: {},
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const UserSlice = createSlice({
  name: "users",
  initialState: initVal,
  reducers: {
    logout: (state) => {
        state.user = null;
        state.isSuccess = false;
        state.isError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload; 
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Registration failed.";
      })

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
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
      
  }
});

export const {logout} = UserSlice.actions;
export default UserSlice.reducer;

