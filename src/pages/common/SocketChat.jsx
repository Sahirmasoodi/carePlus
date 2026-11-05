import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { createSocketConnection } from "../../utils/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { fetchChats } from "../../store/slices/chat/chat.thunk";

const ChatUI = () => {
  const { user } = useSelector((store) => store.common.auth);
  const { chat } = useSelector((store) => store.common.chat);

  const dispatch = useDispatch();
  const { toUserId } = useParams();

  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const receiver = chat?.participants?.find((p) => p._id !== user._id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    dispatch(fetchChats(toUserId));
  }, [dispatch, toUserId]);

  useEffect(() => {
    if (chat?.messages) {
      setData(chat.messages);
    }
  }, [chat]);

  useEffect(() => {
    socketRef.current = createSocketConnection();
    const socket = socketRef.current;

    socket.emit("register", user?._id);

    socket.emit("joinChat", {
      senderId: user?._id,
      receiverId: toUserId,
    });

    socket.on("messageReceived", ({ messageData }) => {
      setData((prev) => [...prev, messageData]);
    });

    socket.on("typing", ({ senderId }) => {
      if (senderId !== user._id) {
        setTypingUser(senderId);
      }
    });

    socket.on("stopTyping", () => {
      setTypingUser(null);
    });

    socket.on("userOnline", ({ userId }) => {
      setOnlineUsers((prev) => [...new Set([...prev, userId])]);
    });

    socket.on("userOffline", ({ userId }) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    });

    return () => {
      socket.disconnect();
    };
  }, [toUserId, user?._id]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const payload = {
      senderId: user._id,
      text: message,
      time: new Date(),
    };

    socketRef.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: toUserId,
      messageData: payload,
    });

    setMessage("");

    socketRef.current.emit("stopTyping", {
      senderId: user._id,
      receiverId: toUserId,
    });
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    socketRef.current.emit("typing", {
      senderId: user._id,
      receiverId: toUserId,
    });

    setTimeout(() => {
      socketRef.current.emit("stopTyping", {
        senderId: user._id,
        receiverId: toUserId,
      });
    }, 1000);
  };

  const isOnline = onlineUsers.includes(receiver?._id);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar role={user?.role} />

      <div className="flex-1 flex overflow-hidden mt-4 rounded-xl">
        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="bg-[#606FFD] px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-3xl text-white" />
              <div>
                <p className="font-semibold text-white capitalize">
                  {receiver?.firstName} {receiver?.lastName}
                </p>
                <p className="text-xs text-green-300">
                  {isOnline ? "● Online" : "● Offline"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {data.map((msg, i) => {
              const isMe = msg.senderId === user._id;

              return (
                <div
                  key={i}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex flex-col max-w-xs">
                    <div
                      className={`px-4 py-2 text-sm ${
                        isMe
                          ? "bg-[#606FFD] text-white rounded-2xl rounded-br-none"
                          : "bg-white border rounded-2xl rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">
                      {new Date(msg.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {typingUser === receiver?._id && (
            <p className="text-sm text-gray-400 italic ms-4">Typing...</p>
          )}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-3 py-2">
              <input
                value={message}
                onChange={handleTyping}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                placeholder="Type a message..."
                className="flex-1 bg-transparent outline-none text-sm px-2"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#606FFD] text-white p-2 rounded-xl"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChatUI;
