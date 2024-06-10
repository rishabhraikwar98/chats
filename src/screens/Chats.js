import React, { useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import ChatList from "../components/ChatList";
import MessageBox from "../components/MessageBox";
import { useDispatch} from "react-redux";
import { resetChats, unselectChat } from "../features/chat/chatSlice";
const Chats = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    
    return () => {
      dispatch(unselectChat());
      dispatch(resetChats())
    };
  }, [dispatch]);
  return (
    <Grid container gap={2} height="90vh">
      <Grid item xs={3} component={Paper} elevation={3}>
        <ChatList />
      </Grid>
      <Grid
        item
        xs={8}
        component={Paper}
        elevation={3}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <MessageBox />
      </Grid>
    </Grid>
  );
};

export default Chats;
