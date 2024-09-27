import { Button } from "@/components/ui/button";
import { useUpdatePaymentStatusMutation } from "@/stores/api/motelUtilApi";
import { CheckIcon, XIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function PaymentStatus() {
  const [URLSearchParam] = useSearchParams();
  const [updateStatus] = useUpdatePaymentStatusMutation();
  const statusCode = URLSearchParam.get("vnp_ResponseCode");

  if (statusCode == "00")
    return (
      <div className="flex items-center justify-center">
        <div className="border py-16 rounded-lg shadow-sm bg-background w-[600px] text-center">
          <div className="size-[200px] rounded-full bg-green-100 p-10 mx-auto">
            <div className="rounded-full bg-green-300 size-full flex items-center justify-center text-green-700">
              <CheckIcon strokeWidth={4} size={40} />
            </div>
          </div>
          <div className="font-medium text-2xl text-green-700 mt-6">
            Thanh toán thành công
          </div>
          <div className="text-sm text-slate-600">
            Bạn đã thanh toán thành công cho đơn hàng bằng VnPay
          </div>
          <div className="text-sm text-slate-600">
            Thời gian thanh toán: {URLSearchParam.get("vnp_PayDate")}
          </div>

          <Button
            className="mt-6"
            onClick={() => {
              const reservationId = URLSearchParam.get("vnp_TxnRef");
              reservationId &&
                updateStatus({ reservationId, status: "PAYMENT_SUCCESS" });
            }}
          >
            <Link to="/">Xác nhận và Trờ về trang chủ</Link>
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center ">
      <div className="border py-16 px-10 rounded-lg shadow-sm bg-background  w-[600px] text-center">
        <div className="size-[200px] rounded-full bg-red-100 p-10 mx-auto">
          <div className="rounded-full bg-red-300 size-full flex items-center justify-center text-red-700">
            <XIcon strokeWidth={4} size={40} />
          </div>
        </div>
        <div className="font-medium text-2xl text-red-700 mt-6">
          Thanh toán thất bại
        </div>
        <div className="text-sm text-slate-600">
          Đã có lỗi xảy ra với đơn hàng của bạn vui lòng kiểm tra hoặc thực hiện
          lại
        </div>
        <div className="text-sm text-slate-600">
          Thời gian thanh toán: {URLSearchParam.get("vnp_PayDate")}
        </div>

        <Button
          className="mt-6"
          onClick={() => {
            const reservationId = URLSearchParam.get("vnp_TxnRef");
            reservationId &&
              updateStatus({ reservationId, status: "PAYMENT_FAIL" });
          }}
        >
          <Link to="/">Xác nhận và Trờ về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
}
