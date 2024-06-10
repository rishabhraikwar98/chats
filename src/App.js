import React from "react";
import AuthProvider from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Layout from "./Layout";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NotFound from "./screens/NotFound";
import MyProfile from "./screens/MyProfile";
import Chats from "./screens/Chats";
import MyFriends from "./screens/MyFriends";
import Search from "./screens/Search";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <AuthProvider>
      <Toaster />
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <Layout>
                <PrivateRoutes />
              </Layout>
            }
          >
            <Route path="/chats" element={<Chats />} />
            <Route path="/my-friends" element={<MyFriends />} />
            <Route path="/search" element={<Search />} />
            <Route path="/my-profile" element={<MyProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
