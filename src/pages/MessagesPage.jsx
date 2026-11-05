import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Send, UserRound } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import useSocket from "../hooks/useSocket";
import { fullName, initials } from "../utils/format";
import EmptyState from "../components/EmptyState";
export default function MessagesPage() {
  const { user } = useAuth();
  const { socket, connected } = useSocket();
  const [contacts, setContacts] = useState([]),
    [selected, setSelected] = useState(""),
    [messages, setMessages] = useState([]),
    [text, setText] = useState(""),
    [error, setError] = useState("");
  useEffect(() => {
    api
      .get("/clinic/appointments")
      .then((list) => {
        const map = new Map();
        list
          .filter((item) => ["confirmed", "completed"].includes(item.status))
          .forEach((item) => {
            const person = user.role === "doctor" ? item.patient : item.doctor;
            if (person?._id) map.set(person._id, person);
          });
        setContacts([...map.values()]);
      })
      .catch((e) => setError(e.message));
  }, []);
  const active = contacts.find((p) => p._id === selected);
  const load = () => {
    if (selected)
      api
        .get(`/clinic/chats/${selected}`)
        .then((result) => setMessages(result.messages || []))
        .catch((e) => setError(e.message));
  };
  useEffect(() => {
    load();
  }, [selected]);
  useEffect(() => {
    if (!socket) return;
    const handler = (payload) => {
      if (
        String(payload.conversationId) ===
          String(messages[0]?.conversation?._id) ||
        payload.message?.sender?._id === selected
      )
        setMessages((old) => [...old, payload.message]);
    };
    socket.on("chat:message", handler);
    return () => socket.off("chat:message", handler);
  }, [socket, selected, messages]);
  const send = async (e) => {
    e.preventDefault();
    if (!text.trim() || !selected) return;
    try {
      const message = await api.post(`/clinic/chats/${selected}/messages`, {
        text,
      });
      setMessages((old) => [...old, message]);
      setText("");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <div className="page-intro">
        <div>
          <span className="overline">PRIVATE CARE MESSAGING</span>
          <h2>Conversations</h2>
          <p>Keep your care conversations connected to your hospital.</p>
        </div>
        <span className={`connection-indicator ${connected ? "online" : ""}`}>
          <i />
          {connected ? "Live connection" : "Reconnecting"}
        </span>
      </div>
      {error && <div className="inline-error">{error}</div>}
      <section className="messaging-shell">
        <aside className="contact-list">
          <div className="contact-list-heading">YOUR CARE CONTACTS</div>
          {contacts.map((person) => (
            <button
              key={person._id}
              className={selected === person._id ? "active" : ""}
              onClick={() => setSelected(person._id)}
            >
              <span className="avatar">{initials(person)}</span>
              <span>
                <b>{fullName(person)}</b>
                <small>{person.specialization || person.role}</small>
              </span>
              <i>›</i>
            </button>
          ))}
          {!contacts.length && (
            <p className="contact-empty">
              Contacts appear after you have a confirmed appointment.
            </p>
          )}
        </aside>
        <div className="conversation-panel">
          {selected ? (
            <>
              <header className="conversation-header">
                <span className="avatar">{initials(active)}</span>
                <span>
                  <b>{fullName(active)}</b>
                  <small>Private hospital conversation</small>
                </span>
              </header>
              <div className="message-stream">
                {messages.map((message, index) => (
                  <div
                    key={message._id || index}
                    className={`message-bubble ${String(message.sender?._id || message.sender) === String(user._id) ? "mine" : ""}`}
                  >
                    <p>{message.text}</p>
                    <small>
                      {message.createdAt
                        ? new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Just now"}
                    </small>
                  </div>
                ))}
                {!messages.length && (
                  <EmptyState
                    icon={MessageCircle}
                    title="Start the conversation"
                    description="Messages are available for confirmed appointments."
                  />
                )}
              </div>
              <form className="message-composer" onSubmit={send}>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write a message…"
                  maxLength={4000}
                />
                <button
                  className="button button-primary"
                  disabled={!text.trim()}
                >
                  <Send size={15} /> Send
                </button>
              </form>
            </>
          ) : (
            <EmptyState
              icon={UserRound}
              title="Choose a care contact"
              description="Select a doctor or patient from the list to open your conversation."
            />
          )}
        </div>
      </section>
    </>
  );
}
