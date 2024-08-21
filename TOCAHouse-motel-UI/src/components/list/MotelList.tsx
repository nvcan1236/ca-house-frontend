import { useEffect, useState } from "react";
import Motel from "./Motel";
import { IMotel } from "@/utils/interfaces";
import axios from "@/services/axios";
import { caHouseEndpoint } from "@/configs/APIconfig";
import { toast } from "sonner";
import MotelSkeleton from "./MotelSkeleton";

const MotelList = () => {
  // const motel: IMotel = {
  //   id: "123",
  //   area: 20,
  //   availableDate: "10/9/2024",
  //   createdAt: "",
  //   images: [
  //     {
  //       id: "123",
  //       url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D",
  //     },
  //     {
  //       id: "124",
  //       url: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     },
  //   ],
  //   name: "Executive Suite",
  //   price: 1200,
  //   status: "AVAILABLE",
  //   type: "SINGLE_ROOM",
  // };
  const [motelList, setMotelList] = useState<IMotel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(caHouseEndpoint.getAllMotel)
      .then((data) => {
        setMotelList(data?.data?.result?.data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.response.data));
  }, []);

  return (
    <div>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-8">
        {loading &&
          Array(10)
            .fill(Math.random())
            .map((i) => <MotelSkeleton key={i} />)}
        {motelList?.map((motel, i) => (
          <Motel motel={motel} key={i} />
        ))}
      </div>
    </div>
  );
};

export default MotelList;
