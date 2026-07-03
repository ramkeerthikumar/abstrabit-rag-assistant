import { useState } from "react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🚀 Register button clicked");

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    console.log("📩 Email:", cleanEmail);
    console.log("🔑 Password length:", cleanPassword.length);

    if (!cleanEmail || !cleanPassword) {
      alert("Email and password are required");
      return;
    }

    if (cleanPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      console.log("📡 Sending request to Supabase...");

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: cleanPassword,
      });

      console.log("📦 Supabase response:");
      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        alert(error.message);
        return;
      }

      if (!data.user) {
        console.warn("⚠️ No user returned from Supabase");
      }

      alert("Signup successful! Check Supabase Users tab.");

      navigate("/");
    } catch (err: any) {
      console.error("❌ Unexpected error:", err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-green-600 text-center">
          Register
        </h1>

        <input
          className="w-full p-2 border mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-3"
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p
          className="text-sm text-center mt-3 cursor-pointer text-blue-500"
          onClick={() => navigate("/")}
        >
          Back to login
        </p>
      </form>
    </div>
  );
}