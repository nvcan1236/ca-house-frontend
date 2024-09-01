import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { language } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  logout,
  openAuthModal,
  setUserInfor,
  switchFormType,
} from "@/stores/slices/authSlice";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { authAxios } from "@/services/axios";
import { caHouseEndpoint } from "@/configs/APIconfig";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle, LanguagesIcon, MenuIcon } from "lucide-react";
import CreatePasswordForm from "../form/CreatePasswordForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { LogoutDialog } from "../common/LogoutDialog";

const NoSearchHeader = () => {
  const { i18n } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const changeLanguage = (value: language) => {
    console.log(value);
    i18n.changeLanguage(value);
  };
  useEffect(() => {
    authAxios.get(caHouseEndpoint.getMyInfor).then((data) => {
      if (data.status === 200) {
        dispatch(setUserInfor(data.data.result));
      }
    });
  }, []);
  return (
    <header className="container">
      <div
        className={`md:px-10 flex items-center justify-between py-4 gap-x-4 transition-all}`}
      >
        <div className="w-[200px] cursor-pointer" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="logo" className="object-cover w-20 h-20" />
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="flex gap-4 items-center">
            <Select onValueChange={changeLanguage}>
              <SelectTrigger className="w-[100px] text-sm">
                <LanguagesIcon className="size-4 " />
                {`(${i18n.language.toUpperCase()}) `}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="vi">Vietnamese</SelectItem>
              </SelectContent>
            </Select>

            <div>
              {user && Object.keys(user).length > 0 ? (
                <div className="flex gap-2 items-center">
                  <Popover>
                    <PopoverTrigger>
                      <div className="bg-background flex items-center gap-1 rounded-md border py-2 px-4">
                        <MenuIcon />
                        <span className="font-medium max-w-20 text-ellipsis text-nowrap ml-3 mr-1 text-sm">
                          {user?.firstName}
                        </span>
                        <Avatar className="size-6">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="w-fit max-w-[200px] p-2"
                    >
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
                                    <AlertCircle className="size-4" /> Tạo mật
                                    khẩu
                                  </AlertDescription>
                                </Alert>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle className="text-main-blue text-xl">
                                    Tạo mật khẩu
                                  </DialogTitle>
                                  <DialogDescription>
                                    Tạo mật khẩu lần đầu vì bạn đã đăng nhập
                                    bằng Google. Từ giờ bạn có thể đăng nhập với
                                    username là email và mật khẩu này
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
                        <li
                          className="py-1 px-2 hover:bg-slate-100 transition-all"
                          onClick={() => navigate(`./profile/${user.id}`)}
                        >
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
                        <li className="py-1 px-2 hover:bg-slate-100 transition-all t-destructive">
                          <LogoutDialog />
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
        </div>
      </div>
    </header>
  );
};

export default NoSearchHeader;
