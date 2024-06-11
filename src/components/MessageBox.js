import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
  Avatar,
  Badge,
  Stack,
  Chip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import {
  addMessage,
  fetchChatsThunk,
  fetchMessagesThunk,
} from "../features/chat/chatSlice";
import { socket } from "../socket";
import { FormatTimeStamp } from "../utils/FormatTimeStamp";
import BeatLoader from "react-spinners/BeatLoader";

const MessagesBox = () => {
  const uid = localStorage.getItem("uid");
  const { token } = useAuth();
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.activeChats.selectedChat);
  const selectedUser = useSelector((state) => state.activeChats.selectedUser);
  const messages = useSelector((state) => state.activeChats.messages);
  const loadingMessages = useSelector(
    (state) => state.activeChats.loadingMessages
  );
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [typingStatus, setTypingStatus] = useState(false);

  useEffect(() => {
    if (selectedChat) {
      dispatch(fetchMessagesThunk({ selectedChatId: selectedChat, token }));
    }
    if (socket) {
      socket.on("new-message", (data) => {
        if (data.chat === selectedChat) {
          dispatch(addMessage(data));
        }
        dispatch(fetchChatsThunk(token));
      });
      socket.on("user-typing", (data) => {
        if (data.chat === selectedChat && data.from === selectedUser._id) {
          setTypingStatus(true);
        }
      });
      socket.on("user-typing-stopped", (data) => {
        if (data.chat === selectedChat && data.from === selectedUser._id) {
          setTypingStatus(false);
        }
      });
      return () => {
        socket.off("new-message");
        socket.off("user-typing");
        socket.off("user-typing-stopped");
      };
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    socket.emit("text-message", {
      chat: selectedChat,
      from: uid,
      to: selectedUser._id,
      content: message,
    });
    setMessage("");
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages,typingStatus]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleTyping = (e) => {
    setMessage(e.target.value);
    const data = { chat: selectedChat, from: uid,to:selectedUser._id };
    socket.emit("typing", data);
    setTimeout(() => {
      socket.emit("stopped-typing", data);
    }, 3000);
  };

  return (
    <>
      {selectedUser ? (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
            p={2}
            pr={5}
            sx={{ borderBottom: "1px solid #ccc" }}
          >
            <Box display="flex" alignItems="center">
              <Avatar src={selectedUser.avatar} alt={selectedUser.name} />
              <Typography variant="h6" sx={{ ml: 2 }}>
                {selectedUser.name}
              </Typography>
            </Box>
            <Badge
              color={selectedUser.online ? "warning" : "error"}
              badgeContent={selectedUser.online ? "Online" : "Offline"}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flex={1}
            sx={{ p: 2, pr: 0, overflowY: "auto", maxHeight: 520 }}
          >
            {loadingMessages ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flex={1}
              >
                <CircularProgress />
              </Box>
            ) : messages.length ? (
              messages.map((msg) => (
                <Box
                  key={msg._id}
                  sx={{
                    display: "flex",
                    mb: 1,
                    justifyContent:
                      msg.from === selectedUser._id ? "flex-start" : "flex-end",
                  }}
                >
                  <Stack spacing={0.1} minWidth={100} maxWidth="70%">
                    <Typography
                      variant="body1"
                      sx={{
                        p: 1,
                        bgcolor:
                          msg.from === selectedUser._id ? "#f0f0f0" : "#007bff",
                        color: msg.from === selectedUser._id ? "#000" : "#fff",
                        borderRadius: 1,
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.content}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        alignSelf:
                          msg.from === selectedUser._id
                            ? "flex-start"
                            : "flex-end",
                      }}
                    >
                      {FormatTimeStamp(msg.createdAt)}
                    </Typography>
                  </Stack>
                </Box>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
                Start new conversation
              </Typography>
            )}
            <div ref={messagesEndRef} />
            {typingStatus?<BeatLoader color="gray" size={15}/>:""}
          </Box>
          <Divider />
          <Box display="flex" p={2} sx={{ mt: "auto" }}>
            <TextField
              variant="outlined"
              placeholder="Type a message..."
              value={message}
              onChange={handleTyping}
              fullWidth
              multiline
              maxRows={3}
              sx={{ mr: 2 }}
            />
            <IconButton
              sx={{ p: 1 }}
              color="primary"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flex={1}
          sx={{ flexDirection: "column" }}
        >
          <ChatBubbleOutlineIcon sx={{ fontSize: 100, mb: 2, color: "#ccc" }} />
          <Typography variant="h6" color="textSecondary">
            Select a chat to start messaging
          </Typography>
        </Box>
      )}
    </>
  );
};

export default MessagesBox;
