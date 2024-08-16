import EditIcon from "@/components/icon/EditIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { caHouseEndpoint } from "@/configs/APIconfig";
import axios from "@/services/axios";
import { getToken } from "@/services/localStorageService";
import { DetailUser } from "@/utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [detailUser, setDetailUser] = useState<DetailUser | null>(null);
  const { userId } = useParams();
  const fetchDetailUser = async () => {
    if (userId) {
      try {
        const response = await axios.get(caHouseEndpoint.getUserById(userId), {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setDetailUser(response.data.result);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };
  useEffect(() => {
    userId != "" && fetchDetailUser();
  }, [userId]);

  return (
    <div className="container mb-20 xl:w-[1200px]">
      <div className=" mt-5 flex flex-col items-center">
        <div className="from-main-blue from-30% to-main-yellow bg-gradient-to-br h-[180px] w-full rounded-lg mx-auto"></div>
        <div className="-mt-[60px] flex items-center flex-col">
          <Avatar className="md:size-36 size-32 border">
            <AvatarImage src={detailUser?.avatar} alt="@shadcn" />
            <AvatarFallback className="md:text-5xl text-3xl">
              {detailUser?.firstName[0].toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="mt-4 font-semibold">
            {detailUser?.firstName} {detailUser?.lastName}
          </span>
          <span className="text-gray-600 text-sm">@{detailUser?.id}</span>
        </div>
      </div>

      <div className="p-10 rounded-lg bg-main-blue-t8 mt-10">
        <form action="" contentEditable={false}>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row">
              <span className="md:w-1/4 font-semibold text-gray-700  md:px-10 py-4 flex justify-between items-baseline">
                Tài khoản{" "}
                <Button variant={"ghost"} size={"sm"}>
                  Sửa <EditIcon className="ml-2"></EditIcon>
                </Button>
              </span>
              <div className="border rounded-md flex-1 flex flex-col gap-2 py-3 px-6 bg-slate-50">
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Id</Label>{" "}
                  <Input value={detailUser?.id} />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Username</Label>{" "}
                  <Input value={detailUser?.username} />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Họ</Label>{" "}
                  <Input value={detailUser?.lastName} />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Tên</Label>{" "}
                  <Input value={detailUser?.firstName} />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Email</Label>{" "}
                  <Input value={detailUser?.email} />
                </div>
                <Button className="self-end px-10">Lưu</Button>
              </div>
            </div>
          </div>
        </form>

        <form action="" contentEditable={false}>
          <div className="flex flex-col mt-10 ">
            <div className="flex flex-col md:flex-row">
            <span className="md:w-1/4 font-semibold text-gray-700 md:px-10 py-4 flex justify-between items-baseline">
                Hồ sơ{" "}
                <Button variant={"ghost"} size={"sm"}>
                  Sửa <EditIcon className="ml-2"></EditIcon>
                </Button>
              </span>
              <div className=" border rounded-md flex-1 flex flex-col gap-2 py-3 px-6 bg-slate-50">
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Ngày sinh</Label>{" "}
                  <Input
                    value={detailUser?.profile?.dob}
                    placeholder="dd-mm-yyyy"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Điện thoại</Label>{" "}
                  <Input
                    value={detailUser?.profile?.phone}
                    placeholder="xxxx-xxx-xxx"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Link messenger</Label>{" "}
                  <Input
                    value={detailUser?.profile?.messgenger}
                    placeholder="m.me/username"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Nghề nghiệp</Label>{" "}
                  <Input
                    value={detailUser?.profile?.occupation}
                    placeholder="Học sinh, sinh viên, công nhân, ..."
                  />
                </div>
                <Button className="self-end px-10">Lưu</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
