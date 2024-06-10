import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  searchResults: [],
  loading: false,
  searchError: false,
  selectedProfile: null,
  loadingProfile: false,
  profileError: false,
};

// Thunk to search profiles
export const searchProfileThunk = createAsyncThunk(
  "redux/search-profile",
  async ({ searchTerm, token }, thunkAPI) => {
    try {
      const params = { query: searchTerm };
      const { data } = await axios.get(`${BASE_URL}/api/v1/profile/search`, {
        params: params,
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

// Thunk to view profile details
export const viewProfileThunk = createAsyncThunk(
  "redux/select-profile",
  async ({ profileId, token }, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/profile/${profileId}`, {
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

const searchSlice = createSlice({
  name: "search-profiles",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
    resetSelectedProfile: (state) => {
      state.selectedProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProfileThunk.rejected, (state) => {
        state.loading = false;
        state.searchError = true;
      });
    builder
      .addCase(viewProfileThunk.pending, (state) => {
        state.loadingProfile = true;
      })
      .addCase(viewProfileThunk.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.selectedProfile = action.payload;
      })
      .addCase(viewProfileThunk.rejected, (state) => {
        state.loadingProfile = false;
        state.profileError = true;
      });
  },
});

export const { resetSearchResults, resetSelectedProfile } = searchSlice.actions;
export default searchSlice.reducer;
