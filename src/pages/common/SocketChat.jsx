import React from "react";
import { useEffect } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { createSocketConnection } from "../../utils/socketConnection";

const ChatUI = () => {
  const messages = [
    { text: "Hello doctor!", sender: "me" },
    { text: "Hi, how can I help you?", sender: "doctor" },
    { text: "I have a headache", sender: "me" },
  ];
  useEffect(() => {
    const socket = createSocketConnection();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      socket.emit("joinChat", { data: "walai bobai" });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="h-screen flex bg-gray-100">
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
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                  msg.sender === "me"
                    ? "bg-purple-600 text-white"
                    : "bg-white shadow"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-xl px-4 py-2 outline-none"
          />
          <button className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
