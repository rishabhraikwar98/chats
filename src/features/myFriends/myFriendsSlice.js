import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  friendsList: [],
  loadingFriends: false,
  friendsError: false,
  requestsList: [],
  loadingRequests: false,
  requestsError: false,
};

// Thunk to fetch friends
export const fetchMyFriendsThunk = createAsyncThunk(
  "redux/fetch-friends",
  async (token, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      toast.error("Something went wrong!");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch friend requests
export const fetchFriendRequestsThunk = createAsyncThunk(
  "redux/fetch-friend-requests",
  async (token, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/friends/requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      toast.error("Something went wrong!");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice definition
const myFriendsSlice = createSlice({
  name: "my-friends",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyFriendsThunk.pending, (state) => {
        state.loadingFriends = true;
      })
      .addCase(fetchMyFriendsThunk.fulfilled, (state, action) => {
        state.loadingFriends = false;
        state.friendsList = action.payload;
      })
      .addCase(fetchMyFriendsThunk.rejected, (state) => {
        state.loadingFriends = false;
        state.friendsError = true;
      })
      .addCase(fetchFriendRequestsThunk.pending, (state) => {
        state.loadingRequests = true;
      })
      .addCase(fetchFriendRequestsThunk.fulfilled, (state, action) => {
        state.loadingRequests = false;
        state.requestsList = action.payload;
      })
      .addCase(fetchFriendRequestsThunk.rejected, (state) => {
        state.loadingRequests = false;
        state.requestsError = true;
      });
  },
});

export default myFriendsSlice.reducer;
