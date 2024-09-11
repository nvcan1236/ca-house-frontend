import { useState } from "react";
import Motel from "./Motel";
import MotelSkeleton from "./MotelSkeleton";
import { LayoutGridIcon, MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Map from "../common/Map";
import { useGetMotelsQuery } from "@/stores/api/motelApi";

const MotelList = () => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const { data, isFetching } = useGetMotelsQuery({});
  const motelList = data?.result.data;
  return (
    <div className="">
      {showMap ? (
        <div className="fixed inset-0 z-30">
          <Map motels={motelList}></Map>
        </div>
      ) : (
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-8">
          {isFetching
            ? Array(10)
                .fill(0)
                .map((_, index) => <MotelSkeleton key={index} />)
            : motelList?.map((motel, i) => <Motel motel={motel} key={i} />)}
        </div>
      )}

      <Button
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? (
          <>
            <LayoutGridIcon size={20} className="mr-2" /> Xem danh sách
          </>
        ) : (
          <>
            <MapIcon size={20} className="mr-2" /> Xem trên Map
          </>
        )}
      </Button>
    </div>
  );
};

export default MotelList;
