import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  Input,
  Typography,
  IconButton,
  useMediaQuery,
  Stack,
  InputAdornment,
  LinearProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../context/AuthContext";
import { registerService } from "../services/auth";
import toast from "react-hot-toast";
function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)"); // Adjust breakpoint as needed
  useEffect(() => {
    if (token) {
      navigate("/chats");
    }
  }, [navigate, token]);
  const handleRegister = async () => {
    try {
      setLoading(true);
      const body = { name, email, password, confirmPassword };
      const { data } = await registerService(body);
      login(data.access_token,data.uid);
      toast.success(data.message);
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const toggleConfirmPasswordVisible = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: isMobile ? "100%" : "50%" }}>
        {loading ? <LinearProgress /> : ""}
        <Card
          sx={{ borderRadius: 2, px: { xs: 3, sm: 7 }, py: 4, boxShadow: 3 }}
        >
          <CardContent>
            <Typography
              sx={{ textTransform: "uppercase", fontSize: { xs: 25, sm: 30 } }}
              color="#555"
            >
              Account Signup
            </Typography>
            <Stack sx={{ mt: 4 }} gap={4}>
              <FormControl>
                <InputLabel sx={{ color: "#555", mb: 1 }}>Full Name</InputLabel>
                <Input
                  autoFocus
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputLabel sx={{ color: "#555", mb: 1 }}>Email</InputLabel>
                <Input
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputLabel sx={{ color: "#555", mb: 1 }}>Password</InputLabel>
                <Input
                  fullWidth
                  type={visible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={toggleVisible}>
                        {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl>
                <InputLabel sx={{ color: "#555", mb: 1 }}>
                  Confirm Password
                </InputLabel>
                <Input
                  fullWidth
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={toggleConfirmPasswordVisible}>
                        {confirmPasswordVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Stack>
            <Button
              sx={{ borderRadius: 20, px: { xs: 5, sm: 7 }, py: 1.5, mt: 3 }}
              variant="contained"
              color="success"
              onClick={handleRegister}
              disabled={loading}
            >
              Register
            </Button>
          </CardContent>
          <Box display="flex" justifyContent="flex-end">
            <Typography variant="caption">
              Already have an Account? <NavLink to="/login">Login</NavLink>
            </Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default Signup;
