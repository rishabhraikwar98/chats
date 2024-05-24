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
import React, { useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function MyProfile() {
  const fileRef = useRef();
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [name, setName] = useState("John Doe");
  const [about, setAbout] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  const [isEditing, setIsEditing] = useState({ name: false, about: false });

  const handleAvatarChange = () => {
    const file = fileRef.current.files[0];
    if (file) {
      // API for avatar change
    }
  };

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    // Save logic here (e.g., API call)
  };

  return (
    <Box display={"flex"} justifyContent="center" sx={{mt:8}}>
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
              {loadingAvatar ? (
                <CircularProgress
                  sx={{ position: "absolute", zIndex: 50 }}
                  size={95}
                />
              ) : (
                ""
              )}
              <Avatar
                sx={{ height: 100, width: 100, opacity: loadingAvatar && 0.6 }}
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
          <Stack sx={{ px: 5,py:3 }} gap={4}>
            <FormControl>
              <FormLabel sx={{mb: 1 }}>Name</FormLabel>
              {isEditing.name ? (
                <Box display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <IconButton onClick={() => handleSave('name')} sx={{ ml: 2 }}>
                    <SaveIcon fontSize="small"/>
                  </IconButton>
                </Box>
              ) : (
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1">{name}</Typography>
                  <IconButton onClick={() => handleEdit('name')}>
                    <EditIcon fontSize="small"/>
                  </IconButton>
                </Box>
              )}
            </FormControl>
            <Divider/>
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
                  <IconButton onClick={() => handleSave('about')} sx={{ ml: 2 }}>
                    <SaveIcon fontSize="small"/>
                  </IconButton>
                </Box>
              ) : (
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">{about}</Typography>
                  <IconButton onClick={() => handleEdit('about')}>
                    <EditIcon fontSize="small"/>
                  </IconButton>
                </Box>
              )}
            </FormControl>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MyProfile;
