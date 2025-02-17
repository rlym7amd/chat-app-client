import { format, parseISO } from "date-fns";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { User } from "../components/SidebarLayout";
import { fetchWithAuth } from "../utils/helpers";

interface Conversation {
  id: string;
  createdAt: string;
  messages: {
    content: string;
    createdAt: string;
    sender: User;
  }[];
}

export default function ConversationPane() {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<Conversation>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchWithAuth(
      `${import.meta.env.VITE_API_DOMAIN}/api/conversations/${conversationId}`
    )
      .then((res) => res.json())
      .then((data) => setConversation(data))
      .finally(() => setIsLoading(false));
  }, [conversationId]);

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
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
          <button className="bg-black text-white font-medium transition-colors p-3 rounded-lg cursor-pointer hover:bg-black/90">
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
