import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch {
        nav("/login");
      }
    })();
  }, [nav]);

  const logout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  if (!user)
    return <div className="min-h-screen grid place-items-center">Loading…</div>;

  return (
    <section className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-10 space-y-4">
        <h2 className="text-3xl font-semibold">Welcome, {user.username}</h2>
        <p className="text-gray-600">Email: {user.email}</p>
        <button onClick={logout} className="btn-primary">
          Log out
        </button>
      </div>
    </section>
  );
}
