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
import {
  logout,
  openAuthModal,
  setUserInfor,
  switchFormType,
} from "@/stores/slices/authSlice";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import BarIcon from "../icon/BarIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { authAxios } from "@/services/axios";
import { caHouseEndpoint } from "@/configs/APIconfig";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import CreatePasswordForm from "../form/CreatePasswordForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const Header = () => {
  const { i18n } = useTranslation();
  const role = useAppSelector((state) => state.common.role);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const changeLanguage = (value: language) => {
    console.log(value);
    i18n.changeLanguage(value);
  };
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    authAxios.get(caHouseEndpoint.getMyInfor).then((data) => {
      if (data.status === 200) {
        dispatch(setUserInfor(data.data.result));
      }
    });

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

          <div className="flex w-full items-center gap-1 py-1 pl-4 pr-2 border rounded-full bg-background border-main-blue">
            <DrawerDialogFilter />
            <Input
              placeholder="Địa chỉ trọ muốn tìm kiếm ..."
              className=" h-[46px] flex-1 border-none bg-transparent"
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
          {user && Object.keys(user).length > 0 ? (
            <div className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger>
                  <div className="bg-background flex items-center gap-1 rounded-md border py-2 px-4">
                    <BarIcon />
                    <span className="font-medium max-w-20 text-ellipsis text-nowrap ml-3 mr-1 text-sm">
                      {user?.firstName}
                    </span>
                    <Avatar className="size-6">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-fit max-w-[200px] p-2">
                  <ul>
                    {user?.noPassword && (
                      <>
                        <li className=" hover:bg-yellow-50 transition-all mb-1"></li>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Alert
                              variant="destructive"
                              className="w-full py-2 text-main-yellow border-main-yellow cursor-pointer"
                            >
                              <AlertDescription className="text-sm flex gap-2 items-center">
                                <AlertCircle className="size-4" /> Tạo mật khẩu
                              </AlertDescription>
                            </Alert>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle className="text-main-blue text-xl">Tạo mật khẩu</DialogTitle>
                              <DialogDescription>
                                Tạo mật khẩu lần đầu vì bạn đã đăng nhập bằng
                                Google. Từ giờ bạn có thể đăng nhập với username
                                là email và mật khẩu này
                              </DialogDescription>
                            </DialogHeader>
                            <CreatePasswordForm />
                          </DialogContent>
                        </Dialog>
                        <li className="py-2">
                          <Separator />
                        </li>
                      </>
                    )}
                    <li className="py-1 px-2 hover:bg-slate-100 transition-all" onClick={() => navigate(`./profile/${user.id}`)}>
                      Profile
                    </li>
                    <li className="py-1 px-2 hover:bg-slate-100 transition-all">
                      Danh sách yêu thích
                    </li>
                    <li className="py-1 px-2 hover:bg-slate-100 transition-all">
                      Cài đặt
                    </li>
                    <li className="py-1">
                      <Separator />
                    </li>
                    <li
                      className="py-1 px-2 hover:bg-slate-100 transition-all t-destructive"
                      onClick={() => dispatch(logout())}
                    >
                      Đăng xuất
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(openAuthModal());
                dispatch(switchFormType("login"));
              }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
