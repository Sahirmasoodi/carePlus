import { io } from "socket.io-client";
let socket;
export function getSocket() {
  if (!socket)
    socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3333", {
      withCredentials: true,
      autoConnect: false,
    });
  return socket;
}
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
