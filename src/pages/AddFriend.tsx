import { useState } from "react";
import { fetchWithAuth } from "../utils/helpers";
import { toast } from "react-toastify";

export default function AddFriend() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function SendRequest() {
    setIsLoading(true);
    fetchWithAuth(`${import.meta.env.VITE_API_DOMAIN}/api/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        }
        return res.json();
      })
      .then((data) => toast.success(data.message))
      .catch((err) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  }

  return (
    <main className="p-4">
      <p className="text-base uppercase">Add Friend</p>
      <p className="text-neutral-700">You can add friends with their email</p>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          placeholder="You can add friends with their email"
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-sm"
        />
        <button
          onClick={SendRequest}
          disabled={isLoading}
          className="bg-green-500 text-white text-sm font-medium transition-colors px-3 py-2 rounded cursor-pointer hover:bg-green-500/80"
        >
          Send Friend Request
        </button>
      </div>
    </main>
  );
}
