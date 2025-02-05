import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchWithAuth } from "../libs/helpers";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isLoading, setIsloading] = useState(false);
  console.log({ isLoading });

  useEffect(() => {
    setIsloading(true);
    fetchWithAuth(`${import.meta.env.VITE_API_DOMAIN}/api/user/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .finally(() => setIsloading(false));
  }, []);

  if (isLoading) {
    return <div>Loadinggg....</div>;
  }

  if (!user) {
    navigate("/login");
  }

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
