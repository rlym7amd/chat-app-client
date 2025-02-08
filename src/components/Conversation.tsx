import { MessageCircle, SquarePen } from "lucide-react";
import { Link } from "react-router";

const mockData = {
  users: [
    {
      id: 1,
      name: "Alice",
      avatar: "https://example.com/avatars/alice.png",
    },
    {
      id: 2,
      name: "Bob",
      avatar: "https://example.com/avatars/bob.png",
    },
    {
      id: 3,
      name: "Charlie",
      avatar: "https://example.com/avatars/charlie.png",
    },
  ],
  conversations: [
    {
      id: 1,
      participants: [1, 2],
      messages: [
        {
          senderId: 1,
          text: "Hey Bob! How's it going?",
          timestamp: "2023-10-01T10:00:00Z",
        },
        {
          senderId: 2,
          text: "Hi Alice! I'm doing well, thanks! You?",
          timestamp: "2023-10-01T10:01:00Z",
        },
        {
          senderId: 1,
          text: "Just working on some projects. Want to catch up later?",
          timestamp: "2023-10-01T10:02:00Z",
        },
      ],
    },
    {
      id: 2,
      participants: [1, 3],
      messages: [
        {
          senderId: 1,
          text: "Hey Charlie! Are you free to chat?",
          timestamp: "2023-10-01T11:00:00Z",
        },
        {
          senderId: 3,
          text: "Hi Alice! Sure, what's up?",
          timestamp: "2023-10-01T11:01:00Z",
        },
        {
          senderId: 1,
          text: "I wanted to discuss our project timeline.",
          timestamp: "2023-10-01T11:02:00Z",
        },
      ],
    },
    {
      id: 3,
      participants: [2, 3],
      messages: [
        {
          senderId: 2,
          text: "Charlie, did you finish the report?",
          timestamp: "2023-10-01T12:00:00Z",
        },
        {
          senderId: 3,
          text: "Almost done! Just need to add a few more details.",
          timestamp: "2023-10-01T12:01:00Z",
        },
        {
          senderId: 2,
          text: "Great! Let me know if you need any help.",
          timestamp: "2023-10-01T12:02:00Z",
        },
      ],
    },
  ],
};

export default function Conversation() {
  return (
    <div className="flex h-dvh text-neutral-900">
      <SideBar />
      <main className="flex-1">
        <div className="flex flex-col h-full p-4">
          {/* Message Display Area */}
          <div className="flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgb(220_220_220)_transparent] mb-4">
            {mockData.conversations[0].messages.map((message, index) => (
              <div key={index} className="p-3 rounded-lg max-w-xs mb-2">
                {message.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              type="text"
              // value={inputValue}
              // onChange={(e) => setInputValue(e.target.value)}
              // onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
            <button
              // onClick={handleSendMessage}
              className="bg-black text-white font-medium transition-colors p-3 rounded-lg cursor-pointer hover:bg-black/90"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function SideBar() {
  return (
    <nav className="bg-white flex flex-col h-full border-r border-neutral-400 w-64">
      <h2 className="px-4 pt-4 flex items-center justify-between">
        <span className="text-lg tracking-tight">Conversations</span>
        <SquarePen className="size-4" />
      </h2>
      <div className="mt-2 px-3 pt-2 h-full overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgb(220_220_220)_transparent]">
        {mockData.users.map((user) => (
          <button className="w-full cursor-pointer hover:bg-neutral-100 transition-colors rounded-lg px-2 my-1 flex items-center gap-2">
            <MessageCircle className="size-4" />
            <span className="px-2 py-1">{user.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto border-t border-neutral-400">
        <Link
          to="/login"
          className="text-base p-4 inline-block w-full hover:bg-neutral-100 transition-colors"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
