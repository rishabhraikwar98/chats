import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputAdornment,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  resetSearchResults,
  resetSelectedProfile,
  searchProfileThunk,
  viewProfileThunk,
} from "../features/search/searchSlice";
import { socket } from "../socket";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Search = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.search.searchResults);
  const [searchTerm, setSearchTerm] = useState("");
  const loading = useSelector((state) => state.search.loading)
  const selectedProfile = useSelector((state) => state.search.selectedProfile);
  const loadingProfile = useSelector((state)=>state.search.loadingProfile)

  useEffect(() => {
    if (searchTerm.trim().length) {
      handleSearch();
    } else {
      dispatch(resetSearchResults());
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    dispatch(searchProfileThunk({searchTerm,token}));
  };
  const handleProfileClick = (profileId) => {
    dispatch(viewProfileThunk({profileId,token}));
  };

  const handleClose = () => {
    dispatch(resetSelectedProfile());
  };

  const handleFriendRequestSend = async (profileId) => {
    try {
      await axios.post(BASE_URL + "/api/v1/friends/new_request/" + profileId);
      handleProfileClick(profileId);
      if(socket){
        socket.emit("friend-request",profileId);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const handleFriendRequestCancel = async (profileId) => {
    try {
      await axios.post(
        BASE_URL + "/api/v1/friends/cancel_request/" + profileId
      );
      handleProfileClick(profileId);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const handleRemoveFriend = async (profileId) => {
    try {
      await axios.patch(BASE_URL + "/api/v1/friends/remove/" + profileId);
      handleProfileClick(profileId);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Search People
      </Typography>

      <Box display="flex" justifyContent="center" mb={4}>
        <TextField
          placeholder="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "65%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {loading ? <CircularProgress size={25} /> : <SearchIcon />}
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {profiles.length ? (
        <Paper elevation={3} sx={{ p: 2 }}>
          <List sx={{ maxHeight: 460, overflowY: "auto" }}>
            {profiles.map((profile) => (
              <ListItem
                key={profile._id}
                onClick={() => handleProfileClick(profile._id)}
                sx={{ borderRadius: 1, my: 1, cursor: "pointer" }}
              >
                <ListItemAvatar>
                  <Avatar src={profile.avatar} alt={profile.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={profile.name}
                  secondary={profile.email}
                />
                {profile.isFriend && (
                  <Chip label="Friends" color="success" sx={{ ml: 2 }} />
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        ""
      )}
      {!profiles.length && !loading ? (
        <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
          {searchTerm.trim().length ? "No profile found!" : ""}
        </Typography>
      ) : (
        ""
      )}
      <Dialog
        open={Boolean(selectedProfile)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Profile Details</DialogTitle>
        {loadingProfile ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          selectedProfile && (
            <DialogContent>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <Avatar
                  src={selectedProfile.avatar}
                  alt={selectedProfile.name}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h5">{selectedProfile.name}</Typography>
                <Typography variant="caption">
                  {selectedProfile.email}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {selectedProfile.about}
                </Typography>
                {selectedProfile.isFriend ? (
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleRemoveFriend(selectedProfile._id)}
                    sx={{ mt: 2 }}
                  >
                    Unfriend
                  </Button>
                ) : selectedProfile.sentRequest ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      handleFriendRequestCancel(selectedProfile._id)
                    }
                    sx={{ mt: 2 }}
                  >
                    Cancel Request
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleFriendRequestSend(selectedProfile._id)}
                    sx={{ mt: 2 }}
                  >
                    Add Friend
                  </Button>
                )}
              </Box>
            </DialogContent>
          )
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Search;
