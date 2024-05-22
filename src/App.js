import React from 'react'
import AuthProvider from './context/AuthContext'
import { BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import PrivateRoutes from "./utils/PrivateRoutes"
import Login from './screens/Login'
import Register from './screens/Register'
import NotFound from './screens/NotFound'
import MyProfile from './screens/MyProfile'
import Chats from './screens/Chats'
import { CssBaseline } from '@mui/material'
function App() {
  return (
    <AuthProvider>
      <CssBaseline/>
      <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route element={<PrivateRoutes/>}>
          <Route path ="/chats" element={<Chats/>} />
          <Route path ="/my-profile" element={<MyProfile/>} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </Router>
    </AuthProvider>
  ) 
}

export default App