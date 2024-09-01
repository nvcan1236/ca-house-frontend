import H3 from "@/components/common/H3";
import Motel from "@/components/list/Motel";
import MotelSkeleton from "@/components/list/MotelSkeleton";
import { useNavigate } from "react-router-dom";

const MotelManage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section>
        <H3>Danh sách phòng của bạn</H3>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  grid-cols-1 mt-6 gap-4">
          <div className="border rounded-lg ">
            <Motel
              onClick={() => navigate(`./${"12323"}`)}
              motel={{
                area: 25,
                availableDate: Date.now().toString(),
                city: "Ho Chi Minh",
                createdAt: Date.now().toString(),
                district: "Nha Be",
                id: "1232",
                images: [],
                latitude: 12,
                longitude: 12,
                name: "Trọ Nhà Bè",
                price: 2000000,
                status: "ĐANG MỞ",
                type: "SINGLE_ROOM",
              }}
            ></Motel>
          </div>
          <div className="border rounded-lg ">
            <MotelSkeleton></MotelSkeleton>
          </div>
          <div className="border rounded-lg ">
            <MotelSkeleton></MotelSkeleton>
          </div>
          <div className="border rounded-lg ">
            <MotelSkeleton></MotelSkeleton>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <H3>Yêu cầu xem phòng</H3>
        <div>
        </div>
      </section>
      <section className="mt-10">
        <H3>Yêu cầu cọc phòng</H3>
        <div>
        </div>
      </section>
    </div>
  );
};

export default MotelManage;
