import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  ListItemText,
  Typography,
  CircularProgress,
  IconButton,
  Paper,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert, Check, Close } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFriendRequestsThunk,
  fetchMyFriendsThunk,
} from "../features/myFriends/myFriendsSlice";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MyFriends = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.myFriends.friendsList);
  const friendRequests = useSelector((state) => state.myFriends.requestsList);
  const loading = useSelector((state) => state.myFriends.loadingFriends);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common.Authorization = "Bearer " + token;
    dispatch(fetchMyFriendsThunk(token));
    dispatch(fetchFriendRequestsThunk(token));
  }, [dispatch, token]);

  const handleAccept = async (requestId) => {
    try {
      await axios.post(BASE_URL+"/api/v1/friends/request/"+requestId)
      dispatch(fetchMyFriendsThunk(token));
      dispatch(fetchFriendRequestsThunk(token));
    } catch (error) {
      toast.error("Something went wrong!")
    }
  };

  const handleDecline = async(requestId) => {
    try {
      await axios.delete(BASE_URL+"/api/v1/friends/request/"+requestId)
      dispatch(fetchMyFriendsThunk(token));
      dispatch(fetchFriendRequestsThunk(token));
    } catch (error) {
      toast.error("Something went wrong!")
    }
  };

  const handleMenuOpen = (event, friend) => {
    setAnchorEl(event.currentTarget);
    setSelectedFriend(friend);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveFriend = async(friendId) => {
    try {
      await axios.patch(BASE_URL+"/api/v1/friends/remove/"+friendId)
      dispatch(fetchMyFriendsThunk(token));
    } catch (error) {
      toast.error("Something went wrong!")
    }finally{
      setAnchorEl(null);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 850, mx: "auto", mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">My Friends</Typography>
        <IconButton color="primary" onClick={() => setOpen(true)}>
          <Badge badgeContent={friendRequests.length} color="error">
            <PersonAddIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Box>

      <Paper elevation={3} sx={{ p: 1 }}>
        {friends.length ? (
          <List sx={{ overflowY: "auto", maxHeight: 550 }}>
            {friends.map((friend) => (
              <ListItem key={friend._id} sx={{ borderRadius: 1, my: 1 }}>
                <ListItemAvatar>
                  <Avatar src={friend.avatar} alt={friend.name} />
                </ListItemAvatar>
                <ListItemText primary={friend.name} secondary={friend.email} />
                <IconButton onClick={(event) => handleMenuOpen(event, friend)}>
                  <MoreVert />
                </IconButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            You have no friends yet!
          </Typography>
        )}
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem onClick={() => handleRemoveFriend(selectedFriend._id)}>
          <ListItemIcon>
            <PersonRemoveIcon />
          </ListItemIcon>
          <ListItemText primary="Unfriend" />
        </MenuItem>
      </Menu>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Friend Requests</DialogTitle>
        <DialogContent
          sx={{ minWidth: 600, maxHeight: 350, overflowY: "auto" }}
        >
          {friendRequests.length > 0 ? (
            <List>
              {friendRequests.map((request) => (
                <ListItem key={request._id} sx={{ borderRadius: 1, mb: 1 }}>
                  <ListItemAvatar>
                    <Avatar
                      src={request.sender.avatar}
                      alt={request.sender.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={request.sender.name} />
                  <IconButton onClick={() => handleAccept(request._id)}>
                    <Check />
                  </IconButton>
                  <IconButton onClick={() => handleDecline(request._id)}>
                    <Close />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              No new Requests!
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyFriends;
