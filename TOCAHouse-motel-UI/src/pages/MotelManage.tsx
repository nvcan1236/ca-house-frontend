import H3 from "@/components/common/H3";
import Motel from "@/components/list/Motel";
import { useGetMotelByUserQuery } from "@/stores/api/motelApi";
import { useGetCurrentUserQuery } from "@/stores/api/userApi";

const MotelManage = () => {
  const { data } = useGetCurrentUserQuery();
  const userId = data?.result.username;
  const { data: motelsData } = useGetMotelByUserQuery(userId || "");
  const motels = motelsData?.result;
  return (
    <div>
      <section>
        <H3>Danh sách phòng của bạn</H3>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  grid-cols-1 mt-6 gap-4">
          {motels?.map((motel) => (
            <Motel motel={motel} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <H3>Yêu cầu xem phòng</H3>
        <div></div>
      </section>
      <section className="mt-10">
        <H3>Yêu cầu cọc phòng</H3>
        <div></div>
      </section>
    </div>
  );
};

export default MotelManage;
