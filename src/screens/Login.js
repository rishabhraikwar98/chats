import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  IconButton,
  Checkbox,
  Grid,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { loginService } from "../services/auth";
import toast from "react-hot-toast";
function Login() {
  const { token, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading,setLoading ] = useState(false)
  const isMobile = useMediaQuery("(max-width: 600px)"); // Adjust breakpoint as needed

  useEffect(() => {
    if (token) {
      navigate("/chats");
    }
  }, [token,navigate]);
  const handleLogin = async () => {
    try {
      setLoading(true);
      const body = { email, password };
      const {data} = await loginService(body);
      login(data.access_token,data.uid);
      toast.success(data.message)
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
  };

  const toggleVisible = () => {
    setVisible(!visible);
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
      {loading?<LinearProgress/>:""}
        <Card
          sx={{ borderRadius: 2, px: { xs: 3, sm: 7 }, py: 4, boxShadow: 3 }}
        >
          <CardContent>
            <Typography
              sx={{ textTransform: "uppercase", fontSize: { xs: 25, sm: 30 } }}
              color="#555"
            >
              Account Login
            </Typography>
            <Stack sx={{ mt: 4 }} gap={4}>
              <FormControl>
                <FormLabel sx={{ color: "#555", mb: 1 }}>Email</FormLabel>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel sx={{ color: "#555", mb: 1 }}>Password</FormLabel>
                <TextField
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={visible ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleVisible}>
                          {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Stack>
            <Grid
              container
              sx={{ mx: -1.5, my: 1.5 }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item display="flex" alignItems="center">
                <Checkbox />
                <Typography sx={{ fontWeight: 300 }} variant="body2">
                  Remember me
                </Typography>
              </Grid>
              <Grid>
                <Typography
                  sx={{ fontWeight: 300, mr: -1.5, cursor: "pointer" }}
                  variant="body2"
                >
                  Forgot Password?
                </Typography>
              </Grid>
            </Grid>
            <Button
              sx={{ borderRadius: 20, px: { xs: 5, sm: 7 }, py: 1.5, mt: 2 }}
              variant="contained"
              color="success"
              disabled={loading}
              onClick={handleLogin}
            >
              Login
            </Button>
          </CardContent>
          <Box display="flex" justifyContent="flex-end">
            <Typography variant="caption">
              Don't have an Account? <NavLink to="/register">Register</NavLink>
            </Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;
