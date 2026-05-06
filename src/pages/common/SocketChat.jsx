import React, { useState } from "react";
import { useEffect } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { createSocketConnection } from "../../utils/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { fetchChats } from "../../store/slices/chat/chat.thunk";

const ChatUI = () => {
  const { user } = useSelector((store) => store.common.auth);
  const { chat } = useSelector((store) => store.common.chat);
  const fetchedMessages = chat?.messages;

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const { toUserId } = useParams();

  const messagesEndRef = useRef(null);
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
    if (fetchedMessages) {
      setData(fetchedMessages);
    }
  }, [fetchedMessages]);

  useEffect(() => {
    const socket = createSocketConnection();

    socket.emit("joinChat", { senderId: user?._id, recieverId: toUserId });

    socket.on("messageRecieved", ({ messageData }) => {
      console.log("messageRecieved", messageData);

      setData((pre) => [...pre, messageData]);
    });

    return () => {
      socket.disconnect();
    };
  }, [toUserId, user?._id]);

  function handleSendMessage() {
    const socket = createSocketConnection();
    const payload = {
      senderId: user._id,
      fullName: user?.firstName + " " + user?.lastName,
      text: message,
      time: new Date(),
    };
    socket.emit("sendMessage", {
      senderId: user?._id,
      recieverId: toUserId,
      messageData: payload,
    });
    setMessage("");
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar role={user?.role} />

      <div className="flex-1 flex overflow-hidden mt-4 rounded-xl">
        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="bg-[#606FFD] px-6 py-4 border-b flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUserCircle className="text-2xl text-gray-500" />
              </div>
              <div>
                <p className="font-semibold text-white">Dr. Sarah Khan</p>
                <p className="text-xs text-green-500">● Online</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scroll-smooth">
            {data.map((msg, i) => {
              const isMe = msg?.senderId === user?._id;

              return (
                <div
                  key={i}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex flex-col max-w-xs">
                    <div
                      className={`px-4 py-2 text-sm shadow-sm ${
                        isMe
                          ? "bg-[#606FFD] text-white rounded-2xl rounded-br-none"
                          : "bg-white text-gray-800 rounded-2xl rounded-bl-none border"
                      }`}
                    >
                      {msg?.text}
                    </div>
                    <span
                      className={`text-[10px] mt-0.5 ${
                        isMe ? "text-right text-gray-300" : "text-gray-400 ms-1"
                      }`}
                    >
                      {new Date(msg?.time).toLocaleTimeString([], {
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

          <div className="p-4 bg-white border-t shadow-sm">
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-3 py-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && message.trim()) {
                    e.preventDefault(); // prevents newline / form submit
                    handleSendMessage();
                  }
                }}
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent outline-none text-sm px-2"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#606FFD] text-white p-2 rounded-xl hover:scale-105 transition"
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
