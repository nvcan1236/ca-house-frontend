import H3 from "@/components/common/H3";
import Pagination from "@/components/common/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetReservationsByUserQuery } from "@/stores/api/motelUtilApi";
import { formatDateTime } from "@/utils/helper";
import { useSearchParams } from "react-router-dom";

const UserReservationList = () => {
  const [params] = useSearchParams();
  const { data } = useGetReservationsByUserQuery(
    Number.parseInt(params.get("page") || "1")
  );
  const reservationPage = data?.result;
  return (
    <div className="max-w-[1000px] min-h-[500px] mx-auto">
      <H3>Danh sách lịch hẹn xem phòng</H3>
      <Table className="mt-6 bg-background">
        <TableHeader>
          <TableRow>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Số ngày</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead>Trọ</TableHead>
            <TableHead>Tình trạng thanh toán</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservationPage?.data?.map((resevation) => (
            <TableRow key={resevation.id}>
              <TableCell>{formatDateTime(resevation.createdAt)}</TableCell>
              <TableCell>{1}</TableCell>
              <TableCell>
                {Number(resevation.amount).toLocaleString()}VNĐ
              </TableCell>
              <TableCell>
                {Number(resevation.amount).toLocaleString()}VNĐ
              </TableCell>
              <TableCell>{resevation.motelId}</TableCell>
              <TableCell
                className={`
                ${resevation.status == "PAYMENT_SUCCESS" && "text-green-700"}
                ${resevation.status == "FAIL" && "text-red-600"}
                ${
                  resevation.status == "PENDING" && "text-yellow-600"
                } font-medium
              `}
              >
                {resevation.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Pagination
          current={reservationPage?.currentPage || 1}
          max={reservationPage?.totalPage || 1}
        />
      </div>
    </div>
  );
};

export default UserReservationList;
