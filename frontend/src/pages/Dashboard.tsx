import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import { useWorkspace } from "../contexts/WorkspaceContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { activeWorkspace } = useWorkspace();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [checkingAuth, setCheckingAuth] = useState(true);

  // ✅ SAFE AUTH CHECK (NO REDIRECT BUG)
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/");
        return;
      }

      setCheckingAuth(false);
    };

    checkAuth();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    if (!activeWorkspace) {
      alert("Please select a workspace first.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("workspace_id", activeWorkspace.id);

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ prevent UI flash before auth check completes
  if (checkingAuth) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen p-10 bg-gray-50">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          Dashboard
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/workspaces")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Workspace
          </button>

          <button
            onClick={() => navigate("/chat")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Chat
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ACTIVE WORKSPACE */}
      <div className="mb-4 text-sm text-gray-600">
        Active Workspace:{" "}
        <b>{activeWorkspace?.name || "Not selected"}</b>
      </div>

      {/* UPLOAD */}
      <div className="border p-6 rounded bg-white">
        <h2 className="text-xl font-semibold mb-3">
          Upload Document
        </h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
  onClick={uploadFile}
  disabled={loading || !file}
  className="ml-4 bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-50"
>
  {loading ? "Uploading..." : "Upload PDF"}
</button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-6 bg-white p-4 border rounded">
          <h3 className="font-bold mb-2">Backend Response</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}