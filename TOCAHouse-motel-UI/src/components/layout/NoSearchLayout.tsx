/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Outlet } from "react-router-dom";

import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NoSearchHeader from "./NoSearchHeader";
import { Toaster } from "sonner";
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";

const NoSearchLayout = () => {

  return (
    <div
      className={` bg-gradient-to-r transition-all from-slate-100 to-main-blue-t8 "`}
    >
      <NoSearchHeader></NoSearchHeader>
      <div className="container">
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
      <Footer></Footer>
    </div>
  );
};

export default NoSearchLayout;
