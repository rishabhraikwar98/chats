import React, { useEffect } from "react";
import { Box, Snackbar } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { connectSocket, socket } from "./socket";
import toast from "react-hot-toast";
const Layout = ({ children }) => {
  const uid = localStorage.getItem("uid");
  useEffect(() => {
    connectSocket(uid);
    if (socket) {
      socket.on("new-friend-request", (data) => {
        toast.success(data.message, {
          duration: 4500,
        });
      });
    }
    return () => {
      socket.off("new-friend-request");
      socket.disconnect();
    };
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
      <Snackbar />
    </Box>
  );
};

export default Layout;
