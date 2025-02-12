import { MessageCircle, SquarePen } from "lucide-react";
import { Link, Outlet, useNavigate, useParams } from "react-router";
import { conversations } from "../__mocks__/conversations";
import { users } from "../__mocks__/users";

const LOGEDIN_USERID = 1;

export default function Sidebar() {
  const loggedinUserConversation = conversations.filter((conversation) =>
    conversation.participants.includes(LOGEDIN_USERID)
  );

  if (!loggedinUserConversation) {
    return <p>No converation</p>;
  }

  return (
    <div className="flex h-dvh text-neutral-900">
      <nav className="bg-white flex flex-col h-full border-r border-neutral-400 w-64">
        <h2 className="px-4 pt-4 flex items-center justify-between">
          <span className="text-lg tracking-tight">Conversations</span>
          <SquarePen className="size-4" />
        </h2>
        <div className="mt-2 px-3 pt-2 h-full overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgb(220_220_220)_transparent]">
          {loggedinUserConversation.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              participants={conversation.participants}
              conversationId={conversation.id}
            />
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
      <Outlet />
    </div>
  );
}

function ConversationListItem(props: {
  participants: number[];
  conversationId: number;
}) {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const recipientId = props.participants.find(
    (userId) => userId !== LOGEDIN_USERID
  );
  const recipient = users.find((user) => user.id === recipientId);

  if (!recipient) {
    return <p>start a conversation</p>;
  }

  return (
    <button
      onClick={() => navigate(`/conversations/${props.conversationId}`)}
      className={`${
        props?.conversationId === parseInt(conversationId!) &&
        "bg-neutral-200 hover:bg-neutral-200"
      } w-full cursor-pointer hover:bg-neutral-100 transition-colors rounded-lg px-2 my-1 flex items-center gap-2`}
    >
      <MessageCircle className="size-4" />
      <span className="px-2 py-1">{recipient.name}</span>
    </button>
  );
}
