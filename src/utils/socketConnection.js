import { io } from "socket.io-client";
import { BACKEND_BASE_URL } from "../env";

export const createSocketConnection = () => {
  return io(BACKEND_BASE_URL, {
    withCredentials: true,
    transports: ["websocket"],
  });
};