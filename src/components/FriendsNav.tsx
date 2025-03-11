import { Link, Outlet, useLocation } from "react-router";

export default function FriendsNav() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="flex-1">
      <nav className="flex gap-4 px-4 py-2">
        <Link
          to={"friends"}
          className={`${location.pathname === "/friends" && "bg-neutral-200"} font-medium px-2 py-1 rounded cursor-pointer hover:bg-neutral-200 transition`}
        >
          All
        </Link>
        <Link
          to={"friends/pending"}
          className={`${location.pathname.includes("pending") && "bg-neutral-200"} font-medium px-2 py-1 rounded cursor-pointer hover:bg-neutral-200 transition`}
        >
          Pending
        </Link>
        <Link
          to={"friends/add"}
          className="bg-green-500 text-white font-medium px-2 py-1 rounded cursor-pointer"
        >
          Add Friend
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
