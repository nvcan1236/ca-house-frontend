import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex bg-main-blue-t9 min-h-screen">
      <AdminSidebar></AdminSidebar>
      <div className="flex-1 p-2">
        <div className="border rounded-lg bg-background h-full px-6 py-3">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
