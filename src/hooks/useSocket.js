import { useEffect, useState } from "react";
import { getSocket } from "../services/socket";
export default function useSocket(enabled = true) {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const socket = getSocket();
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.connect();
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [enabled]);
  return { socket: enabled ? getSocket() : null, connected };
}
