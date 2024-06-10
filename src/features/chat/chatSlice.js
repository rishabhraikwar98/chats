import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  chats: [],
  loadingChats: false,
  chatsError: false,
  selectedChat: null,
  selectedUser: null,
  messages: [],
  loadingMessages: false,
  messagesError: false,
};
export const fetchChatsThunk = createAsyncThunk(
  "redux/fetch-chats",
  async (token, thunkAPI) => {
    try {
      const { data } = await axios.get(BASE_URL + "/api/v1/chat", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      toast.error("Something went wrong!");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchMessagesThunk = createAsyncThunk(
  "redux/fetch-messages",
  async ({ selectedChatId, token }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        BASE_URL + "/api/v1/chat/messages/" + selectedChatId,
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
const chatSlice = createSlice({
  name: "chat-messages",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload._id;
      state.selectedUser= action.payload.chatDetail;
    },
    unselectChat: (state, action) => {
      state.selectedChat = null;
      state.selectedUser= null;
    },
    resetChats:(state, action) => {
      state.chats = []
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages,action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatsThunk.pending,(state)=>{
        state.loadingChats=true
    })
    builder.addCase(fetchChatsThunk.fulfilled,(state,action)=>{
        state.loadingChats=false
        state.chats=action.payload
    })
    builder.addCase(fetchChatsThunk.rejected,(state)=>{
        state.loadingChats=false
        state.chatsError=true
    })
    builder.addCase(fetchMessagesThunk.pending,(state)=>{
        state.loadingMessages=true
    })
    builder.addCase(fetchMessagesThunk.fulfilled,(state,action)=>{
        state.loadingMessages=false
        state.messages=action.payload
    })
    builder.addCase(fetchMessagesThunk.rejected,(state)=>{
        state.loadingMessages=false
        state.messagesError=true
    })
  },
});
export const {selectChat,unselectChat,resetChats,addMessage} =chatSlice.actions
export default chatSlice.reducer
