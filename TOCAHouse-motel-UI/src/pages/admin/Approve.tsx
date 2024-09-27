import H3 from "@/components/common/H3";
import { DataTable } from "./motels/TableData";
import { useAppSelector } from "@/stores/hooks";
import { useGetMotelsQuery } from "@/stores/api/motelApi";
import { columns } from "./motels/MotelColumns";

const Approve = () => {
  const filter = useAppSelector((state) => state.filter);
  const { data } = useGetMotelsQuery({ page: 1, size: 100, filter, isAdmin:true});
  const motelNotApproved = data?.result.data.filter(motel => !motel.approved)
  return (
    <div className="w-full">
      <H3>Danh sách trọ chờ duyệt</H3>
      <DataTable columns={columns} data={motelNotApproved || []} />
    </div>
  );
};
export default Approve;
