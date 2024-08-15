import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { caHouseEndpoint } from "@/configs/APIconfig";
import { authAxios } from "@/services/axios";
import { DetailUser } from "@/utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [detailUser, setDetailUser] = useState<DetailUser | null>(null);
  const params = useParams();
  useEffect(() => {
    const fetchDetailUser = async () => {
      const userId = params.userId;
      if (userId) {
        try {
          const response = await authAxios.get(
            caHouseEndpoint.getUserById(userId)
          );
          setDetailUser(response.data.result);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchDetailUser();
  }, [params.userId]);

  return (
    <div className="container mb-20 w-[1200px]">
      <div className=" mt-5 flex flex-col items-center">
        <div className="bg-main-blue h-[160px] w-full rounded-lg mx-auto"></div>
        <div className="-mt-[60px] flex items-center flex-col">
          <Avatar className="size-36 border">
            <AvatarImage src={detailUser?.avatar} alt="@shadcn" />
            <AvatarFallback className="text-5xl ">
              {detailUser?.firstName[0].toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="mt-4 font-semibold">
            {detailUser?.firstName} {detailUser?.lastName}
          </span>
          <span className="text-gray-600 text-sm">@{detailUser?.id}</span>
        </div>
      </div>
      <form action="">
        <div className="flex flex-col mt-10">
          <div className="flex">
            <span className="w-1/4 font-semibold text-gray-700  px-10 py-4">
              Tài khoản
            </span>
            <div className="border rounded-sm flex-1 flex flex-col gap-2 p-3">
              <Input value={detailUser?.id} />
              <Input value={detailUser?.username} />
              <Input value={detailUser?.firstName} />
              <Input value={detailUser?.lastName} />
              <Input value={detailUser?.email} />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10">
          <div className="flex">
            <span className="w-1/4 font-semibold text-gray-700  px-10 py-4">
              Hồ sơ
            </span>
            <div className=" border rounded-sm flex-1 flex flex-col gap-2 p-3">
              <Input value={detailUser?.profile?.dob} />
              <Input value={detailUser?.profile?.phone} />
              <Input value={detailUser?.profile?.messgenger} />
              <Input value={detailUser?.profile?.occupation} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
