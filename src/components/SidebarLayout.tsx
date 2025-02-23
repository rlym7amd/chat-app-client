import { MessageCircle, SquarePen } from "lucide-react";
import { Navigate, Outlet, useNavigate, useParams } from "react-router";
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

interface Peer {
  userId: string;
  conversationId: string;
  user: User;
}

export default function SidebarLayout() {
  const [user, setUser] = useState<User>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsUserLoading(true);
    fetchWithAuth(`${import.meta.env.VITE_API_DOMAIN}/api/user/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .finally(() => setIsUserLoading(false));
  }, []);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    <Navigate to={"login"} />;
  }

  return (
    <div className="flex h-dvh text-neutral-900">
      <nav className="bg-white flex flex-col h-full border-r border-neutral-400 w-64">
        <h2 className="px-4 pt-4 flex items-center justify-between">
          <span className="text-lg tracking-tight">Conversations</span>
          <button onClick={() => setIsOpenModal(true)}>
            <SquarePen className="size-4 cursor-pointer" />
          </button>
        </h2>
        <div className="mt-2 px-3 pt-2 h-full overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgb(220_220_220)_transparent]">
          <Peers />
        </div>

        <div className="mt-auto border-t border-neutral-400">
          {user && (
            <div className="flex justify-between w-full">
              <p className="text-base p-4">
                {isUserLoading ? "Loading..." : user.name}
              </p>
              <button
                className="cursor-pointer p-4 border-l border-neutral-400 hover:bg-neutral-100 transition-colors"
                onClick={() => {
                  fetch(`${import.meta.env.VITE_API_DOMAIN}/api/auth/logout`, {
                    method: "POST",
                    credentials: "include",
                  }).then(() => navigate("login"));
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
      {user && (
        <Modal
          userId={user.id}
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
        />
      )}
      <ToastContainer />
    </div>
  );
}

function Peers() {
  const [peers, setPeers] = useState<Peer[]>();
  const [isPeersLoading, setIsPeersLoading] = useState(false);
  const navigate = useNavigate();
  const { conversationId } = useParams();

  useEffect(() => {
    setIsPeersLoading(true);

    fetchWithAuth(`${import.meta.env.VITE_API_DOMAIN}/api/participants/peers`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPeers(data.peers))
      .catch((err) => console.error(err.message))
      .finally(() => setIsPeersLoading(false));
  }, []);

  if (!peers) {
    return <p>No peers</p>;
  }

  if (isPeersLoading) {
    return <p>Loading...</p>;
  }

  return peers.map((peer) => (
    <button
      onClick={() => navigate(`/conversations/${peer.conversationId}`)}
      key={peer.userId}
      className={`${
        peer.conversationId === conversationId &&
        "bg-neutral-200 hover:bg-neutral-200"
      } w-full cursor-pointer hover:bg-neutral-100 transition-colors rounded-lg px-2 my-1 flex items-center gap-2`}
    >
      <MessageCircle className="size-4" />
      <span className="px-2 py-1">{peer.user.name}</span>
    </button>
  ));
}
