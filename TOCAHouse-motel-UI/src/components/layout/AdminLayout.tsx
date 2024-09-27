import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import LazyLoadContainer from "../common/LazyLoadContainer";
import { useAppSelector } from "@/stores/hooks";

const AdminLayout = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  if (!user || !user.roles.includes("ADMIN")) navigate("/admin");
  return (
    <LazyLoadContainer>
      <div className="flex flex-col md:flex-row bg-main-blue-t9 min-h-screen">
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
