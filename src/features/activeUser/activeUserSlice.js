import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  activeUser: null,
  loading: false,
  error: false,
};
export const fetchMyProfileThunk = createAsyncThunk(
  "redux/fetch-my-profile",
  async (token, thunkAPI) => {
    try {
      const { data } = await axios.get(
        BASE_URL + "/api/v1/profile/my_profile",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return data;
    } catch (error) {
      toast.error("Something went wrong!");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const activeUserSlice = createSlice({
  name: "active-user",
  initialState,
  reducers:{
    resetActiveUser: (state)=>{
      state.activeUser=null
    }
  },
  extraReducers: (buider) => {
    buider.addCase(fetchMyProfileThunk.pending, (state) => {
      state.loading = true;
    });
    buider.addCase(fetchMyProfileThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.activeUser = action.payload;
    });
    buider.addCase(fetchMyProfileThunk.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});
export const {resetActiveUser}=activeUserSlice.actions
export default activeUserSlice.reducer;
