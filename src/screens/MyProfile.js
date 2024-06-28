import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  TextField,
  Stack,
  FormControl,
  FormLabel,
  Typography,
  Divider,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { UploadImage } from "../utils/UploadImage";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMyProfileThunk,
} from "../features/activeUser/activeUserSlice";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

function MyProfile() {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const { activeUser } = useSelector((state) => state.activeUser);
  const fileRef = useRef();
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [avatar, setAvatar] = useState(activeUser?.avatar || "");
  const [name, setName] = useState(activeUser?.name || "");
  const [about, setAbout] = useState(activeUser?.about || "");
  const [email, setEmail] = useState(activeUser?.email || "");
  const [isEditing, setIsEditing] = useState({ name: false, about: false });
  const loading = useSelector(state=>state.activeUser.loading);

  useEffect(()=>{
    axios.defaults.headers.common["Authorization"] ="Bearer " +token
    dispatch(fetchMyProfileThunk(token))
  },[])
  const updateMyProfile = async (body) => {
    try {
      await axios.patch(BASE_URL + "/api/v1/profile/my_profile", body,{
        headers:{
          "Content-Type":"application/json"
        }
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (activeUser) {
      setAvatar(activeUser.avatar);
      setName(activeUser.name);
      setAbout(activeUser.about);
      setEmail(activeUser.email);
    }
  }, [activeUser]);

  const handleAvatarChange = async () => {
    const file = fileRef.current.files[0];
    if (file) {
      try {
        setLoadingAvatar(true);
        const newAvatar = await UploadImage(file);
        setAvatar(newAvatar);
        await updateMyProfile({ avatar: newAvatar });
        toast.success("Avatar changed successfully!");
      } catch (error) {
        toast.error("Could not change avatar!");
      } finally {
        setLoadingAvatar(false);
      }
    }
  };

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = async (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    //validation
    if (field === "name" && name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long!");
      setName(activeUser.name);
      return;
    }
    if (field === "about" && about.length > 300) {
      toast.error("About section can not exceed 300 characters!");
      setAbout(activeUser.about);
      return;
    }
    try {
      await updateMyProfile({ [field]: field === "name" ? name : about });
      toast.success(
        `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } updated successfully!`
      );
    } catch (error) {
      toast.error(`Could not update ${field}!`);
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
    <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
      <Card
        sx={{ minWidth: "50vw", boxShadow: 2, borderRadius: 2, px: 4, py: 2 }}
      >
        <CardHeader sx={{ textAlign: "center" }} title="My Profile" />
        <CardContent>
          <Box display="flex" justifyContent="center">
            <IconButton
              sx={{ position: "relative" }}
              disabled={loadingAvatar}
              onClick={() => fileRef.current.click()}
            >
              {loadingAvatar && (
                <CircularProgress
                  sx={{ position: "absolute", zIndex: 50 }}
                  size={95}
                />
              )}
              <Avatar
                src={avatar}
                alt={name}
                sx={{
                  height: 100,
                  width: 100,
                  opacity: loadingAvatar ? 0.6 : 1,
                }}
              />
            </IconButton>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              onChange={handleAvatarChange}
            />
          </Box>
          <Stack sx={{ px: 5, py: 3 }} gap={4}>
            <FormControl>
              <FormLabel sx={{ mb: 1 }}>Name</FormLabel>
              {isEditing.name ? (
                <Box display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <IconButton onClick={() => handleSave("name")} sx={{ ml: 2 }}>
                    <SaveIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1">{name}</Typography>
                  <IconButton onClick={() => handleEdit("name")}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </FormControl>
            <Divider />
            <FormControl>
              <FormLabel sx={{ mb: 1 }}>About</FormLabel>
              {isEditing.about ? (
                <Box display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    multiline
                    rows={5}
                  />
                  <IconButton
                    onClick={() => handleSave("about")}
                    sx={{ ml: 2 }}
                  >
                    <SaveIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  maxWidth={650}
                >
                  <Typography variant="body1">{about}</Typography>
                  <IconButton onClick={() => handleEdit("about")}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </FormControl>
            <Divider />
            <FormControl>
              <FormLabel sx={{ mb: 1 }}>Email</FormLabel>
              <Box display="flex" alignItems="center">
                <Typography variant="body1">{email}</Typography>
              </Box>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MyProfile;
