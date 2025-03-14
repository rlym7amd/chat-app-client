import { ChevronsUpDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { User } from "./SidebarLayout";
import { fetchWithAuth } from "../utils/helpers";
import { toast } from "react-toastify";

export default function Modal(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [friends, setFriends] = useState<User[]>();
  const [receiptId, setReceiptId] = useState<string>();

  useEffect(() => {
    if (props.isOpen) {
      ref.current?.showModal();
    }

    fetchWithAuth(`${import.meta.env.VITE_API_DOMAIN}/api/friends`)
      .then((res) => res.json())
      .then((data) => setFriends(data.friends))
      .catch((err) => console.error(err.message));
  }, [props.isOpen]);

  return (
    <div className="relative">
      <dialog
        ref={ref}
        id="modal"
        className="w-lg p-4 absolute top-1/2 left-1/2 -translate-1/2 backdrop:bg-slate-950/40 rounded-md outline-1 outline-blue-200"
      >
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Send a message</h3>
          <button
            onClick={() => {
              ref.current?.close();
              props.setIsOpen(false);
            }}
            className="p-2 bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200 transition-colors"
          >
            <X className="size-4 text-blue-700" />
          </button>
        </div>
        {friends && friends?.length !== 0 ? (
          <form className="mt-3">
            <p className="mb-1">
              Choose a user from the list below, to send a message
            </p>
            <div className="relative  text-gray-900 flex items-center w-52 rounded-md outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
              <select
                name="user"
                id="user"
                className="appearance-none focus:outline-none w-full px-2 py-1"
                defaultValue="none"
                onChange={(e) => setReceiptId(e.target.value)}
              >
                <option value="none" disabled>
                  Select a friend
                </option>
                {friends.map((friend) => (
                  <option key={friend.id} value={friend.id}>
                    {friend.name}
                  </option>
                ))}
              </select>
              <ChevronsUpDown className="size-4 absolute  top-1/2 right-2 -translate-y-1/2" />
            </div>
            <button
              type="button"
              className="mt-2 py-1.5 px-3 bg-blue-700 hover:bg-blue-500 transition-colors cursor-pointer rounded-md text-white font-semibold"
              onClick={() => {
                fetchWithAuth(
                  `${import.meta.env.VITE_API_DOMAIN}/api/conversations`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      receiptId,
                    }),
                  },
                )
                  .then((res) => {
                    if (res.status === 409) {
                      throw new Error("Conversation already exists");
                    }
                    if (!res.ok) {
                      throw new Error("Something went bad. Please try again!");
                    }
                    return res.json();
                  })
                  .then((data) => {
                    toast.success(data.message);
                  })
                  .catch((err) => {
                    toast.error(err.message);
                  })
                  .finally(() => {
                    props.setIsOpen(false);
                    ref.current?.close();
                  });
              }}
            >
              Send
            </button>
          </form>
        ) : (
          <p className="mt-1 text-red-500">Add some friends!</p>
        )}
      </dialog>
    </div>
  );
}
