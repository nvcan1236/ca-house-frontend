import H3 from "@/components/common/H3";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAppointmentByUserQuery } from "@/stores/api/motelApi";
import { formatDate, formatDateTime } from "@/utils/helper";
import { appointmentStatus } from "@/utils/predefinedData";

const UserAppointmentList = () => {
  const { data } = useGetAppointmentByUserQuery();
  const appointments = data?.result;
  return (
    <div className="max-w-[1000px] mx-auto">
      <H3>Danh sách lịch hẹn xem phòng</H3>
      <Table className="mt-6 bg-background">
        <TableHeader>
          <TableRow>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Ngày hẹn</TableHead>
            <TableHead>Tình trạng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments?.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{formatDateTime(app.createdAt)}</TableCell>
              <TableCell>{formatDate(app.date)}</TableCell>
              <TableCell
                className={`
                ${app.status == "ACCEPT" && "text-green-700"}
                ${app.status == "DENY" && "text-red-600"}
                ${app.status == "PENDING" && "text-yellow-600"} font-medium
              `}
              >
                {appointmentStatus[app.status]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserAppointmentList;
