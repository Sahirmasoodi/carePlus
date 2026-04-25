import { BACKEND_BASE_URL } from "../env";
import {io} from "socket.io-client"

export const  createSocketConnection = () => {
    return io(BACKEND_BASE_URL)
};
