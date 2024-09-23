import Item from "@/components/common/Item";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useGetUserByIdQuery } from "@/stores/api/userApi";
import { User } from "@/utils/types";
import { ReactNode, useState } from "react";

const UserDialog = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) => {
  const [open, setOpen] = useState(false);
  const { data } = useGetUserByIdQuery(user.id, { skip: !open });
  const detailUser = data?.result;

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <div className="flex p-4 gap-10 ">
          <div className="w-1/3">
            <Label>Ảnh đại diện</Label>
            <img src={detailUser?.avatar} alt="" className="mt-2" />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <Label>Thông tin</Label>
            <Item>
              ID: <span>{detailUser?.id}</span>
            </Item>
            <Item>
              Họ: <span>{detailUser?.lastName}</span>
            </Item>
            <Item>
              Tên: <span>{detailUser?.firstName}</span>
            </Item>
            <Item>
              Username: <span>{detailUser?.username}</span>
            </Item>
            <Item>
              Email: <span>{detailUser?.email}</span>
            </Item>
            <Item>
              Vai trò: <span>{detailUser?.roles}</span>
            </Item>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
