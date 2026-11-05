import { Outlet } from "react-router-dom";
import WorkspaceSidebar from "../components/WorkspaceSidebar";
import WorkspaceHeader from "../components/WorkspaceHeader";
export default function WorkspaceLayout() {
  return (
    <div className="workspace-shell">
      <WorkspaceSidebar />
      <main className="workspace-main">
        <WorkspaceHeader />
        <div className="workspace-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
