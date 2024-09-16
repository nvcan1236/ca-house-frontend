import { ReactNode, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  ArrowLeftFromLineIcon,
  ArrowRightFromLineIcon,
  FileImageIcon,
  HouseIcon,
  UserIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const [show, setShow] = useState<boolean>(true);
  type NavItem = { to: string; label: string; icon: ReactNode };
  const entityNavData: NavItem[] = [
    {
      label: "Người dùng",
      to: "/admin/users",
      icon: <UserIcon size={16} />,
    },
    {
      label: "Nhà trọ",
      to: "/admin/motels",
      icon: <HouseIcon size={16} />,
    },
    {
      label: "Bài đăng",
      to: "/admin/posts",
      icon: <FileImageIcon size={16} />,
    },
  ];
  const statNavData: NavItem[] = [
    {
      label: "Người dùng",
      to: "/admin/stat/users",
      icon: <UserIcon size={16} />,
    },
    {
      label: "Nhà trọ",
      to: "/admin/stat/motels",
      icon: <HouseIcon size={16} />,
    },
    {
      label: "Bài đăng",
      to: "/admin/stat/posts",
      icon: <FileImageIcon size={16} />,
    },
  ];
  return (
    <div className={`${show ? "w-[240px]" : "w-[100px]"}`}>
      <div
        className={`h-screen flex flex-col p-6 transition-all duration-300 fixed top-0 ${
          show ? "w-[240px]" : "w-fit"
        }`}
      >
        <div className={` flex gap-3 items-center ${show ? "h-12" : "h-10"}`}>
          <img src="/logo-no-text.png" alt="logo" className="h-full pl-3" />
          {show && (
            <div className="font-semibold text-main-blue text-sm flex-1 mt-2">
              CAHouse <br /> Admin
            </div>
          )}
        </div>
        <Label className="mt-16 text-base mb-3 text-foreground">
          {show && "Quản lý thông tin"}
        </Label>
        <ul className="flex flex-col gap-0.5">
          {entityNavData.map((nav) => (
            <SidebarItem to={nav.to}>
              {nav.icon} {show && nav.label}
            </SidebarItem>
          ))}
        </ul>
        <Separator className="mt-2"></Separator>

        <Label className=" mt-4 text-base mb-3  text-foreground">
          {show && "Báo cáo thống kê"}
        </Label>
        <ul className="flex flex-col gap-0.5">
          {statNavData.map((nav) => (
            <SidebarItem to={nav.to}>
              {nav.icon} {show && nav.label}
            </SidebarItem>
          ))}
        </ul>
        <Button
          size={"icon"}
          variant={"outline"}
          className="mt-auto ml-auto"
          onClick={() => setShow(!show)}
        >
          {show && <ArrowLeftFromLineIcon></ArrowLeftFromLineIcon>}
          {!show && <ArrowRightFromLineIcon></ArrowRightFromLineIcon>}
        </Button>
      </div>
    </div>
  );
};

const SidebarItem = ({ children, to }: { children: ReactNode; to: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "py-1.5 px-4 rounded-md font-medium flex gap-2 items-center " +
        (!isActive
          ? "text-slate-600 hover:bg-main-blue-t8"
          : "shadow-md border bg-background text-main-blue-s3")
      }
    >
      {children}
    </NavLink>
  );
};

export default AdminSidebar;
