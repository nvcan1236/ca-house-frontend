import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { switchRole } from "@/stores/slices/commonSlice";
import SearchIcon from "../icon/SearchIcon";
import LanguageIcon from "../icon/LanguageIcon";
import { useTranslation } from "react-i18next";
import { language } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useEffect, useState } from "react";
import { DrawerDialogFilter } from "../search/DrawerDialogFilter";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import BarIcon from "../icon/BarIcon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

const Header = () => {
  const { t, i18n } = useTranslation();
  const role = useAppSelector((state) => state.common.role);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const changeLanguage = (value: language) => {
    console.log(value);
    i18n.changeLanguage(value);
  };
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`container z-10 fixed left-1/2 -translate-x-1/2 ${
        scrollY > 0 ? "" : ""
      }`}
    >
      <div
        className={`px-10 flex items-center py-4 gap-x-4 transition-all ${
          scrollY > 0
            ? "bg-background border shadow-lg rounded-t-none rounded-b-xl py-2"
            : ""
        }`}
      >
        <div className="w-[200px] cursor-pointer" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="logo" className="object-cover w-20 h-20" />
        </div>

        <div className="flex flex-col items-center flex-1">
          <div
            className={`flex gap-4 p-2 border border-gray-300 rounded-xl transition-all mb-2 bg-gray-50 ${
              scrollY > 0 ? "scale-0 -translate-y-[100%] h-0 -mt-6" : ""
            }`}
          >
            <Button
              className={`w-[160px] ${role === "for_lease" && "text-gray-500"}`}
              variant={role === "for_rent" ? "default" : "ghost"}
              onClick={() => {
                dispatch(switchRole());
              }}
            >
              Tìm phòng
            </Button>
            <Button
              className={`w-[160px] ${role === "for_rent" && "text-gray-500"}`}
              variant={role === "for_lease" ? "default" : "ghost"}
              onClick={() => {
                dispatch(switchRole());
              }}
            >
              Tìm người thuê
            </Button>
          </div>

          <div className="flex items-center gap-1 py-1 pl-4 pr-2 border rounded-full bg-background border-main-blue">
            <DrawerDialogFilter />
            <Input
              placeholder="Địa chỉ trọ muốn tìm kiếm ..."
              className="w-[600px] h-[46px] border-none bg-transparent"
              accept="enter"
            />

            <Button
              className="rounded-full bg-main-yellow text-primary-foreground"
              size={"icon"}
            >
              <SearchIcon />
            </Button>
          </div>
        </div>

        <div className="flex">
          <Select onValueChange={changeLanguage}>
            <SelectTrigger className="w-[100px] text-sm">
              <LanguageIcon className="size-4 " />
              {/* ${t(
                "common.button.language"
              )}  */}
              {`(${i18n.language.toUpperCase()}) `}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="vi">Vietnamese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          {/* <Button>Login</Button> */}
          <div className="flex gap-2 items-center">
            {/* <span className="font-medium">Canh</span> */}
            <Popover>
              <PopoverTrigger>
                <div className="bg-background flex items-center gap-1 px-2 rounded-md border">
                  <Button variant={"ghost"} size={"icon"}>
                    <BarIcon />
                  </Button>
                  <Avatar className="size-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-fit">
                <ul>
                  <li className="py-1 px-2 hover:bg-slate-100 transition-all">Profile</li>
                  <li className="py-1 px-2 hover:bg-slate-100 transition-all">Danh sách yêu thích</li>
                  <li className="py-1 px-2 hover:bg-slate-100 transition-all">Cài đặt</li>
                  <li className="py-1">
                    <Separator />
                  </li>
                  <li className="py-1 px-2 hover:bg-slate-100 transition-all">Đăng xuất</li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
