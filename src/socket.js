import { io } from "socket.io-client";
let socket;
const connectSocket = (userId) => {
  socket = io(process.env.REACT_APP_BASE_URL,{
    query:{userId},
  });
};

export{socket,connectSocket}