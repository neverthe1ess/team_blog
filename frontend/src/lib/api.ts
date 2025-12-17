export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }
  return res;
}
