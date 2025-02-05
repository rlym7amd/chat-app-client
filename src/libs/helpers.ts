export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshRes = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/api/auth/refresh`,
      {
        ...options,
        credentials: "include",
        method: "POST",
      }
    );

    if (!refreshRes.ok) {
      console.error("Refreshing failed, logging out...");
      throw new Error("Loggin out...");
    }

    return fetch(url, {
      ...options,
      credentials: "include",
    });
  }

  return res;
}
