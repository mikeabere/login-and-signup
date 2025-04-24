import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.message ?? "Signup failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center">Create account</h1>

        <input
          name="username"
          placeholder="Username"
          className="input"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn-primary w-full disabled:opacity-50"
        >
          Sign up
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className="text-indigo-600 hover:underline" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}
