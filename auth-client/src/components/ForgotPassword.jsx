import { useState } from "react";
import API from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setResetLink(res.data.resetLink);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending reset link");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary w-full">
          Send Reset Link
        </button>

        {resetLink && (
          <div className="mt-4 text-center text-green-600">
            <p>Reset link:</p>
            <a className="text-indigo-600 break-words" href={resetLink}>
              {resetLink}
            </a>
          </div>
        )}
      </form>
    </section>
  );
}
