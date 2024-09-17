import Item from "@/components/common/Item";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { User } from "@/utils/types";
import { ReactNode } from "react";

const UserDialog = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) => {
  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:min-w-[600px]">
        <div className="flex p-4 gap-10 ">
          <div className="w-1/3">
            <Label>Ảnh đại diện</Label>
            <img src={user.avatar} alt="" className="mt-2" />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <Label>Thông tin</Label>
            <Item>
              ID: <span>{user.id}</span>
            </Item>
            <Item>
              Họ: <span>{user.lastName}</span>
            </Item>
            <Item>
              Tên: <span>{user.firstName}</span>
            </Item>
            <Item>
              Username: <span>{user.username}</span>
            </Item>
            <Item>
              Email: <span>{user.email}</span>
            </Item>
            <Item>
              Vai trò: <span>{user.roles}</span>
            </Item>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
