// src/Sidebar.js
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  ListItemButton,
  Box,
} from "@mui/material";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FaUserFriends } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext"

const drawerWidth = 240;

const Sidebar = () => {
  const {logout} =useAuth()
  const navigate = useNavigate();
  
  const handleRoute = (route) => {
    switch (route) {
      case "Chats":
        navigate("/chats");
        break;
      case "My Friends":
        navigate("/my-friends");
        break;
      case "Search":
        navigate("/search");
        break;
      case "My Profile":
        navigate("/my-profile");
        break;
      default:
        break;
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Divider />
      <List>
        {["Chats", "My Friends", "Search", "My Profile"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton onClick={() => handleRoute(text)}>
              <ListItemIcon>
                {text === "Chats" && <HiOutlineChatBubbleLeftRight size={24} />}
                {text === "My Friends" && <FaUserFriends size={24} />}
                {text === "Search" && <IoSearch size={24} />}
                {text === "My Profile" && <FaRegUserCircle size={24} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ px: 2, pb: 2 }}>
        <Divider />
        <ListItem>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <FiLogOut size={24} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
