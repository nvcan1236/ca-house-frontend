/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Outlet } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../stores/hooks";
import Header from "./Header";
import Footer from "./Footer";
import NoSearchHeader from "./NoSearchHeader";
import { Toaster } from "sonner";

const NoSearchLayout = () => {
  const role = useAppSelector((state) => state.common.role);

  return (
    <div>
      <NoSearchHeader></NoSearchHeader>
      <div className="">
        <Outlet />
      </div>
      <Toaster position="top-right" richColors closeButton />
      <Footer></Footer>
    </div>
  );
};

export default NoSearchLayout;
