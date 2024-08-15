import { caHouseEndpoint } from "@/configs/APIconfig";
import { authAxios } from "./axios";

export const getUserInfor = () => {
  const user = authAxios.get(caHouseEndpoint.getMyInfor).then((data) => {
    return data.data.result;
  });

  return user;
};
