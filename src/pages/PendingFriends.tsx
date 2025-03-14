import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/helpers";
import { User } from "../components/SidebarLayout";

export default function PendingFriends() {
  const [friendRequests, setFriendRequests] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth(
      `${import.meta.env.VITE_API_DOMAIN}/api/friends?status=pending`,
    )
      .then((res) => res.json())
      .then((data) => setFriendRequests(data.friends))
      .catch((err) => console.error(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-4">
      <span className="text-base uppercase">
        all friends requests - {friendRequests && friendRequests.length}
      </span>
      <div className="mt-2">
        {friendRequests &&
          friendRequests.map((friendRequest) => (
            <div
              key={friendRequest.id}
              className="flex justify-between p-2 hover:bg-neutral-200 transition rounded cursor-pointer border-t border-neutral-400"
            >
              <span>{friendRequest.name}</span>
              <div className="flex gap-2">
                <button className="px-2 py-1 cursor-pointer text-sm hover:bg-neutral-700 hover:text-white rounded transition">
                  Accept
                </button>
                <button className="px-2 py-1 cursor-pointer text-sm text-red-700 hover:bg-red-700 hover:text-white rounded transition">
                  Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
