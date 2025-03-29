import { LogOut, MessageCircle, Plus, User } from "lucide-react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/helpers";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";

export interface User {
  id: string;
  name: string;
  email: string;
  createAt: string;
  updatedAt: string;
}

interface Conversation {
  id: string;
  creatorId: string;
  recipientId: string;
  creator: User;
  recipient: User;
  createAt: string;
}

export default function SidebarLayout() {
  const [user, setUser] = useState<User>();
  const [conversations, setConversations] = useState<Conversation[]>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  async function fetchConversations() {
    try {
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_API_DOMAIN}/api/conversations`,
      );
      const data = await res.json();

      setConversations(data.conversations);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  async function fetchCurrentLoggedInUser() {
    try {
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_API_DOMAIN}/api/users/me`,
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    fetchCurrentLoggedInUser();
    fetchConversations();
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [location]);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={"login"} />;
  }

  return (
    <div className="flex h-dvh text-neutral-900">
      <nav className="bg-white flex flex-col h-full border-r border-neutral-400 w-64">
        <Link
          to={"friends"}
          className={`${
            location.pathname.includes("friends") &&
            "bg-neutral-200 hover:bg-neutral-200"
          } flex gap-3 items-center mx-4 my-2 px-2 py-1 cursor-pointer rounded-lg hover:bg-neutral-100`}
        >
          <User className="size-6" />
          <h2 className="text-xl font-semibold">Friends</h2>
        </Link>
        <h2 className="px-4 flex items-center justify-between">
          <span className="text-sm uppercase">Direct Messages</span>
          <button
            className="cursor-pointer"
            onClick={() => setIsOpenModal(true)}
          >
            <Plus className="size-4" />
          </button>
        </h2>
        <div className="mt-2 px-3 pt-2 h-full overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgb(220_220_220)_transparent]">
          {conversations && user && (
            <Peers conversations={conversations} userId={user.id} />
          )}
        </div>

        <div className="mt-auto border-t border-neutral-400">
          <div className="flex justify-between w-full">
            <p className="text-base p-4">
              {isUserLoading ? "Loading..." : user.name}
            </p>
            <button
              className="cursor-pointer p-4"
              onClick={() => {
                fetch(`${import.meta.env.VITE_API_DOMAIN}/api/auth/logout`, {
                  method: "POST",
                  credentials: "include",
                }).then(() => navigate("login"));
              }}
            >
              <LogOut className="size-4 hover:text-red-700" />
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      <ToastContainer />
    </div>
  );
}

function Peers(props: { conversations: Conversation[]; userId: string }) {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  return props.conversations.map((conversation) => (
    <button
      onClick={() => navigate(`/conversations/${conversation.id}`)}
      key={conversation.id}
      className={`${
        conversation.id === conversationId &&
        "bg-neutral-200 hover:bg-neutral-200"
      } w-full cursor-pointer hover:bg-neutral-100 transition-colors rounded-lg px-2 my-1 flex items-center gap-2`}
    >
      <MessageCircle className="size-4" />
      <span className="px-2 py-1">
        {conversation.creator.id === props.userId
          ? conversation.recipient.name
          : conversation.creator.name}
      </span>
    </button>
  ));
}
