import { useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import api from "../services/api";
import useSocket from "../hooks/useSocket";
import { useAuth } from "../context/AuthContext";
export default function NotificationCenter() {
  const [items, setItems] = useState([]),
    [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { socket } = useSocket(user?.role !== "superadmin");
  const load = () =>
    api
      .get("/clinic/notifications")
      .then(setItems)
      .catch(() => {});
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    if (!socket) return;
    const handler = (item) => setItems((old) => [item, ...old]);
    socket.on("notification:new", handler);
    return () => socket.off("notification:new", handler);
  }, [socket]);
  if (user?.role === "superadmin") return null;
  const unread = items.filter((n) => !n.readAt).length;
  const markRead = async (item) => {
    if (item.readAt) return;
    try {
      const updated = await api.patch(`/clinic/notifications/${item._id}/read`);
      setItems((old) => old.map((n) => (n._id === item._id ? updated : n)));
    } catch {}
  };
  return (
    <div className="notification-wrap">
      <button
        className="header-bell"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
      >
        <Bell size={17} />
        {unread > 0 && <i>{unread > 9 ? "9+" : unread}</i>}
      </button>
      {open && (
        <div className="notification-popover">
          <div className="notification-heading">
            <b>Notifications</b>
            <span>{unread} unread</span>
          </div>
          {items.slice(0, 12).map((item) => (
            <button
              key={item._id}
              className={`notification-item ${!item.readAt ? "unread" : ""}`}
              onClick={() => markRead(item)}
            >
              <span className="notification-dot" />
              <span>
                <b>{item.title}</b>
                <small>{item.body}</small>
                <time>{new Date(item.createdAt).toLocaleString()}</time>
              </span>
            </button>
          ))}
          {!items.length && (
            <p className="notification-empty">You're all caught up.</p>
          )}
        </div>
      )}
    </div>
  );
}
