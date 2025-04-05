import { format, parseISO } from "date-fns";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/helpers";
import { io } from "socket.io-client";
import { Conversation, Message } from "../utils/definitions";
import { useAuth } from "../hooks/useAuth";

const socket = io("http://localhost:1337");

export default function ConversationPane() {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<Conversation>();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    fetchWithAuth(
      `${import.meta.env.VITE_API_DOMAIN}/api/conversations/${conversationId}`
    )
      .then((res) => res.json())
      .then((data) => setConversation(data))
      .finally(() => setIsLoading(false));
  }, [conversationId]);

  useEffect(() => {
    // Join the conversation room
    console.log(conversationId);
    socket.emit("join conversation", conversationId);

    socket.on("chat message", (msg: Message) => {
      // Update the conversation state with the new message
      setConversation((prevConversation) => {
        if (prevConversation) {
          return {
            ...prevConversation,
            messages: [...prevConversation.messages, msg],
          };
        }
        return prevConversation;
      });
    });

    return () => {
      // Leave the conversation room
      socket.emit("leave conversation", conversationId);
      socket.off("chat message");
    };
  }, [conversationId]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input && currentUser) {
      const newMessage: Message = {
        content: input,
        createdAt: new Date().toISOString(),
        conversationId: conversationId || "",
        sender: { ...currentUser },
      };

      socket.emit("chat message", newMessage);
      setInput("");

      // Save message in Database
      fetchWithAuth(
        `${
          import.meta.env.VITE_API_DOMAIN
        }/api/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: input,
          }),
        }
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1">
      <div className="flex flex-col h-full p-4">
        {/* Message Display Area */}
        <div className="flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgb(220_220_220)_transparent] mb-4">
          {conversation?.messages.map((message, index) => (
            <div key={index} className="mb-2 space-y-1">
              <div className="space-x-2">
                <span className="font-medium">{message.sender.name}</span>
                <time className="text-xs text-neutral-700">
                  {format(parseISO(message.createdAt), "dd/MM/yy, hh:mm aa")}
                </time>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={sendMessage}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="bg-black text-white font-medium transition-colors p-3 rounded-lg cursor-pointer hover:bg-black/90"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
