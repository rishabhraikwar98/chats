import React, { useEffect } from "react";
import { Grid, Modal, Paper, useMediaQuery, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatList from "../components/ChatList";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { resetChats, unselectChat } from "../features/chat/chatSlice";

const Chats = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.activeChats.selectedChat);
  const isMobile = useMediaQuery("(max-width: 600px)"); // Adjust breakpoint as needed

  useEffect(() => {
    return () => {
      dispatch(unselectChat());
      dispatch(resetChats());
    };
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch(unselectChat());
  };

  return (
    <Grid
      container
      gap={2}
      minHeight={isMobile ? 800 : 600}
      maxHeight={isMobile ? 800 : 600}
    >
      <Grid item xs={isMobile ? 12 : 3} component={Paper} elevation={3}>
        <ChatList />
      </Grid>
      {!isMobile && (
        <Grid
          item
          xs={8}
          component={Paper}
          elevation={3}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <MessageBox />
        </Grid>
      )}
      {isMobile && selectedChat && (
        <Modal open={Boolean(selectedChat)} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
              borderRadius: 2,
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <MessageBox />
          </Box>
        </Modal>
      )}
    </Grid>
  );
};

export default Chats;
