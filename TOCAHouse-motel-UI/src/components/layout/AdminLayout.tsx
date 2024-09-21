import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import LazyLoadContainer from "../common/LazyLoadContainer";

const AdminLayout = () => {
  return (
    <LazyLoadContainer>
      <div className="flex bg-main-blue-t9 min-h-screen">
        <AdminSidebar></AdminSidebar>
        <div className="flex-1 p-2">
          <div className="border rounded-lg bg-background h-full p-6">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </LazyLoadContainer>
  );
};

export default AdminLayout;
