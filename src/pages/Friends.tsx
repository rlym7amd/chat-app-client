import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/helpers";
import { User } from "../components/SidebarLayout";

export default function Friends() {
  const [friends, setFriends] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth(`${import.meta.env.VITE_API_DOMAIN}/api/friends`)
      .then((res) => res.json())
      .then((data) => setFriends(data.friends))
      .catch((err) => console.error(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-4">
      <span className="text-base uppercase">
        all friends - {friends && friends.length}
      </span>
      <div className="mt-2">
        {friends &&
          friends.map((friend) => (
            <div
              key={friend.id}
              className="flex justify-between p-2 hover:bg-neutral-200 transition rounded cursor-pointer border-t border-neutral-400"
            >
              <span>{friend.name}</span>
              <div className="flex gap-2">
                <button className="px-2 py-1 cursor-pointer text-sm hover:bg-neutral-700 hover:text-white rounded transition">
                  Message
                </button>
                <button className="px-2 py-1 cursor-pointer text-sm text-red-700 hover:bg-red-700 hover:text-white rounded transition">
                  Remove Friend
                </button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
