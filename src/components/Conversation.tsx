import { format, parseISO } from "date-fns";
import { useParams } from "react-router";
import { conversations } from "../__mocks__/conversations";
import { users } from "../__mocks__/users";

export default function ConversationPane() {
  const { conversationId } = useParams();

  const conversation = conversations.find(
    (conversation) => conversation.id === parseInt(conversationId!)
  );

  return (
    <main className="flex-1">
      <div className="flex flex-col h-full p-4">
        {/* Message Display Area */}
        <div className="flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgb(220_220_220)_transparent] mb-4">
          {conversation?.messages.map((message, index) => (
            <div key={index} className="mb-2 space-y-1">
              <div className="space-x-2">
                <span className="font-medium">
                  {users.find((user) => user.id === message.senderId)?.name}
                </span>
                <time className="text-xs text-neutral-700">
                  {format(parseISO(message.timestamp), "dd/MM/yy, hh:mm aa")}
                </time>
              </div>
              <p className="text-sm">{message.text}</p>
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
