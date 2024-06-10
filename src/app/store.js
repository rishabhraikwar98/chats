import { configureStore } from "@reduxjs/toolkit";
import activeUserReducer from "../features/activeUser/activeUserSlice";
import searchReducer from "../features/search/searchSlice";
import myFriendsReducer from "../features/myFriends/myFriendsSlice";
import chatReducer from "../features/chat/chatSlice";
const store = configureStore({
  reducer: {
    activeUser: activeUserReducer,
    search: searchReducer,
    myFriends:myFriendsReducer,
    activeChats:chatReducer,
  },
});
export default store;
