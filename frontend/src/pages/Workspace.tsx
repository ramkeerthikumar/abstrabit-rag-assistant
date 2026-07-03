import { useEffect, useState } from "react";
import {
  createWorkspace,
  getWorkspaces,
} from "../services/workspaceService";
import { useWorkspace } from "../contexts/WorkspaceContext";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";

type WorkspaceType = {
  id: string;
  name: string;
};

export default function Workspace() {
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const { activeWorkspace, setActiveWorkspace } = useWorkspace();

  // 🔐 Auth check (safe + stable)
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = "/";
      }
    };

    checkAuth();
  }, []);

  // 📦 Load workspaces
  const loadWorkspaces = async () => {
    try {
      setLoading(true);

      const data = await getWorkspaces();
      setWorkspaces(data || []);
    } catch (err) {
      console.error("❌ Failed to load workspaces:", err);
      setWorkspaces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  // ➕ Create workspace
  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      setCreating(true);

      await createWorkspace(name.trim());
      setName("");

      await loadWorkspaces();
    } catch (err) {
      console.error("❌ Create workspace error:", err);
    } finally {
      setCreating(false);
    }
  };

  // 🎯 Select workspace (FIXED + PERSISTENT)
 const handleSelect = (ws: WorkspaceType) => {
  setActiveWorkspace(ws);
  localStorage.setItem("activeWorkspace", JSON.stringify(ws));

  navigate("/dashboard");
};

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        Workspaces
      </h1>

      {/* Active workspace */}
      {activeWorkspace && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded">
          Active Workspace:{" "}
          <b>{activeWorkspace.name}</b>
        </div>
      )}

      {/* Create workspace */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Enter workspace name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
          onClick={handleCreate}
          disabled={creating}
        >
          {creating ? "Creating..." : "Create"}
        </button>
      </div>

      {/* List */}
      <div>
        {loading && (
          <p className="text-gray-500">Loading...</p>
        )}

        {!loading && workspaces.length === 0 && (
          <p className="text-gray-500">
            No workspaces found
          </p>
        )}

        {workspaces.map((ws) => (
          <div
            key={ws.id}
            onClick={() => handleSelect(ws)}
            className={`p-3 border rounded mb-2 cursor-pointer transition ${
              activeWorkspace?.id === ws.id
                ? "bg-blue-100 border-blue-500"
                : "hover:bg-gray-100"
            }`}
          >
            {ws.name}
          </div>
        ))}
      </div>
    </div>
  );
}