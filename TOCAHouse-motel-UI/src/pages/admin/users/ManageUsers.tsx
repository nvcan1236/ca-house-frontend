import H3 from "@/components/common/H3";
import { DataTable } from "./TableData";
import { columns } from "./UserColumns";
import { useGetAllUserQuery } from "@/stores/api/userApi";

const ManageUsers = () => {
  const { data } = useGetAllUserQuery();

  return (
    <div className="py-8">
      <H3>Quản lý người dùng</H3>
      <div className="mt-6">
        <DataTable columns={columns} data={data?.result || []} />
      </div>
    </div>
  );
};

export default ManageUsers;
