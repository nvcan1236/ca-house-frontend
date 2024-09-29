/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Outlet } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../stores/hooks";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "sonner";
import { CircleCheckIcon, CircleXIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import Chat from "../common/Chat";

const MainLayout = () => {
  const role = useAppSelector((state) => state.common.role);

  return (
    <div
      className={` via-slate-100 bg-gradient-to-r transition-all ${
        role === "motel"
          ? " from-main-yellow-t9 to-main-blue-t8 "
          : "from-main-blue-t8  to-main-yellow-t9 "
      }`}
    >
      <Header></Header>
      <div className="pt-[160px] pb-10">
        <Outlet />
      </div>
      <Toaster
        position="top-right"
        richColors
        closeButton
        icons={{
          success: <CircleCheckIcon size={20} />,
          info: <InfoIcon size={20} />,
          warning: <TriangleAlertIcon size={20} />,
          error: <CircleXIcon size={20} />,
        }}
      />
      <Chat/>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
