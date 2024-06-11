import React, { useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { fetchChatsThunk, selectChat } from "../features/chat/chatSlice";
import { FormatTimeStamp } from "../utils/FormatTimeStamp";

const ChatList = () => {
  const uid = localStorage.getItem("uid");
  const { token } = useAuth();
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.activeChats.chats);
  const loading = useSelector((state) => state.activeChats.loadingChats);
  const selectedChat = useSelector((state) => state.activeChats.selectedChat);
  useEffect(() => {
    dispatch(fetchChatsThunk(token));
  }, [dispatch]);
  const onsSelectChat = (chat) => {
    dispatch(selectChat(chat));
  };
  const truncateString = (str, maxLength) => {
    if (!str) return;
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ p: 2, borderBottom: "1px solid #ccc" }}>
        Chats
      </Typography>
      {loading && !chats ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      ) : chats.length ? (
        <List>
          {chats.map((chat) => (
            <ListItem
              key={chat._id}
              button
              onClick={() => {
                onsSelectChat(chat);
              }}
              selected={selectedChat === chat._id}
              sx={{ borderRadius: 1, mb: 1 }}
            >
              <ListItemAvatar>
                <Avatar
                  src={chat.chatDetail.avatar}
                  alt={chat.chatDetail.name}
                />
              </ListItemAvatar>
              <ListItemText
                primary={chat.chatDetail.name}
                secondary={
                  chat.lastMessage?.from == uid
                    ? `You: ${truncateString(chat.lastMessage?.content, 12)}`
                    : truncateString(chat.lastMessage?.content, 14)
                }
              />
              <ListItemText
                sx={{ mr: -2 }}
                secondary={
                  <Typography variant="caption">
                    {FormatTimeStamp(chat.lastMessage?.createdAt)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="body1" color="textSecondary">
            No chats available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatList;
