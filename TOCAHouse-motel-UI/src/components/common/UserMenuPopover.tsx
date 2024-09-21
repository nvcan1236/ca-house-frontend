import { AlertCircle, MenuIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { User } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";
import CreatePasswordForm from "../form/CreatePasswordForm";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { LogoutDialog } from "./LogoutDialog";

const UserMenuPopover = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  return (
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
                      <DialogTitle className="text-main-blue text-xl">
                        Tạo mật khẩu
                      </DialogTitle>
                      <DialogDescription>
                        Tạo mật khẩu lần đầu vì bạn đã đăng nhập bằng Google. Từ
                        giờ bạn có thể đăng nhập với username là email và mật
                        khẩu này
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
              <Link to={"/saved-motel"}>Danh sách yêu thích</Link>
            </li>
            <li className="py-1 px-2 hover:bg-slate-100 transition-all">
              {user.roles.includes("ADMIN") && (
                <Link to={"/my-motel"}>Quản lý trọ</Link>
              )}
            </li>
            <li className="py-1 px-2 hover:bg-slate-100 transition-all">
              <Link to={"/my-post"}>Bài viết của tôi</Link>
            </li>
            <li className="py-1 px-2 hover:bg-slate-100 transition-all">
              <Link to={"/my-appointments"}>Lịch hẹn xem phòng đã đặt</Link>
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
  );
};

export default UserMenuPopover;
