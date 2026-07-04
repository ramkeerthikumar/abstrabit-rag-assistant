import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import { useWorkspace } from "../contexts/WorkspaceContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Chat() {
  const navigate = useNavigate();
  const { activeWorkspace } = useWorkspace();

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ✅ SAFE AUTH CHECK
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/");
        return;
      }

      setCheckingAuth(false);
    };

    checkAuth();
  }, [navigate]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    if (!activeWorkspace) {
      alert("Please select a workspace first");
      return;
    }

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
          workspace_id: activeWorkspace.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.answer || "No response",
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Error getting response",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <div className="p-10">Loading chat...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-50">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-600">
          AI Chat
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      {/* CHAT BOX */}
      <div className="flex-1 border rounded p-4 bg-white overflow-y-auto space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-400">
            Ask questions about your documents...
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[70%] shadow-sm text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-gray-400">
            AI is thinking...
          </p>
        )}
      </div>

      {/* INPUT */}
      <div className="mt-4 flex">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              askQuestion();
            }
          }}
          placeholder="Ask something..."
          className="flex-1 border px-4 py-2 rounded-l"
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className={`px-6 rounded-r text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}