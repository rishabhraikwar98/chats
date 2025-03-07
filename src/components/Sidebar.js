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
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FaUserFriends } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 600px)");

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

  const isActiveRoute = (route) => {
    switch (route) {
      case "Chats":
        return location.pathname === "/chats";
      case "My Friends":
        return location.pathname === "/my-friends";
      case "Search":
        return location.pathname === "/search";
      case "My Profile":
        return location.pathname === "/my-profile";
      default:
        return false;
    }
  };

  if (isMobile) {
    return (
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          value={location.pathname}
          onChange={(event, newValue) => {
            handleRoute(newValue);
          }}
        >
          <BottomNavigationAction
            value="/chats"
            icon={<HiOutlineChatBubbleLeftRight size={28} />}
            sx={{
              "&.Mui-selected": { transform: "scale(1.2)" },
              "&:hover": { transform: "scale(1.2)" },
            }}
            onClick={() =>navigate("/chats")}
          />
          <BottomNavigationAction
            value="/my-friends"
            icon={<FaUserFriends size={28} />}
            sx={{
              "&.Mui-selected": { transform: "scale(1.2)" },
              "&:hover": { transform: "scale(1.2)" },
            }}
            onClick={() =>navigate("/my-friends")}
          />
          <BottomNavigationAction
            value="/search"
            icon={<IoSearch size={28} />}
            sx={{
              "&.Mui-selected": { transform: "scale(1.2)" },
              "&:hover": { transform: "scale(1.2)" },
            }}
            onClick={() =>navigate("/search")}
          />
          <BottomNavigationAction
            value="/my-profile"
            icon={<FaRegUserCircle size={28} />}
            sx={{
              "&.Mui-selected": { transform: "scale(1.2)" },
              "&:hover": { transform: "scale(1.2)" },
            }}
            onClick={() =>navigate("/my-profile")}
          />
          <BottomNavigationAction
            value="logout"
            icon={<AiOutlineLogout size={28} />}
            onClick={logout}
            sx={{
              color: "red",
              "&:hover": { transform: "scale(1.2)" },
            }}
          />
        </BottomNavigation>
      </Paper>
    );
  }

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
        {["Chats", "My Friends", "Search", "My Profile"].map((text) => (
          <ListItem key={text}>
            <ListItemButton
              onClick={() => handleRoute(text)}
              selected={isActiveRoute(text)}
              sx={{
                "&.Mui-selected": { transform: "scale(1.05)" },
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
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
          <ListItemButton
            onClick={logout}
            sx={{
              color: "red",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <ListItemIcon>
              <AiOutlineLogout size={24} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
