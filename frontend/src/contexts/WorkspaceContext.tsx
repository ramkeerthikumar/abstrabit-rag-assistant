import { createContext, useContext, useState, useEffect } from "react";

type Workspace = {
  id: string;
  name: string;
};

type WorkspaceContextType = {
  activeWorkspace: Workspace | null;
  setActiveWorkspace: (ws: Workspace | null) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeWorkspace, setActiveWorkspaceState] = useState<Workspace | null>(null);

  // ✅ LOAD ON APP START
  useEffect(() => {
    const stored = localStorage.getItem("activeWorkspace");

    if (stored) {
      try {
        setActiveWorkspaceState(JSON.parse(stored));
      } catch {
        localStorage.removeItem("activeWorkspace");
      }
    }
  }, []);

  const setActiveWorkspace = (ws: Workspace | null) => {
    setActiveWorkspaceState(ws);

    if (ws) {
      localStorage.setItem("activeWorkspace", JSON.stringify(ws));
    } else {
      localStorage.removeItem("activeWorkspace");
    }
  };

  return (
    <WorkspaceContext.Provider value={{ activeWorkspace, setActiveWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const ctx = useContext(WorkspaceContext);

  if (!ctx) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }

  return ctx;
};