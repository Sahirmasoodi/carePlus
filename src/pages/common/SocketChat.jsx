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

    socket.emit("sendMessage", {
      senderId: user?._id,
      recieverId: toUserId,
      text: message,
    });
  }

  return (
    <>
      <Navbar role={user?.role} />
      <div className="h-[50vh] flex bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r hidden md:block">
          <div className="p-4 font-semibold text-lg border-b">Chats</div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
            >
              <FaUserCircle className="text-3xl text-gray-400" />
              <div>
                <p className="font-medium">Dr. Sarah</p>
                <p className="text-sm text-gray-500">Last message...</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white p-4 border-b flex items-center gap-3">
            <FaUserCircle className="text-3xl text-gray-400" />
            <div>
              <p className="font-semibold">Dr. Sarah Khan</p>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {data.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg?.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  ref={messagesEndRef}
                  className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                    msg?.sender === "me"
                      ? "bg-purple-600 text-white"
                      : "bg-white shadow"
                  }`}
                >
                  {msg}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t flex items-center gap-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-xl px-4 py-2 outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChatUI;
