import DecorativeHeading from "@/components/common/DecorativeHeading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch } from "@/stores/hooks";
import { nextStep, prevStep } from "@/stores/slices/createMotelSlice";

const RequirementInfo = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="">
      <div className="flex gap-10 items-stretch">
        <div className="w-1/2 h-[500px] md:block hidden">
          <Skeleton className="size-full"></Skeleton>
        </div>
        <div className=" w-1/2 flex flex-col flex-1">
          <DecorativeHeading className="!text-2xl mb-5 text-main-blue-s3 mt-10">
            Các yêu cầu khi thuê
          </DecorativeHeading>
          <div className="mb-12 flex-1 flex flex-col gap-6">
            <div>
              <Label>Yêu cầu cọc</Label>
              <Input type="number"></Input>
            </div>
            <div>
              <Label>Hợp đồng (tháng)</Label>
              <Input type="number"></Input>
            </div>
            <div className="flex items-center gap-4">
              <Label>Cho nuôi thú cưng</Label>
              <Checkbox className="size-6"  id="terms" />
            </div>
            <div>
              <Label>Đối tượng cho thuê</Label>
              <div className="mt-3 ml-4 ">
                <div className="flex items-center mt-3 gap-3">
                  <Checkbox className="size-6"  id="terms" />
                  <Label>Học sinh, sinh viên</Label>
                </div>

                <div className="flex items-center mt-3 gap-3">
                  <Checkbox className="size-6"  id="terms" />
                  <Label>Công nhân</Label>
                </div>

                <div className="flex items-center mt-3 gap-3">
                  <Checkbox className="size-6"  id="terms" />
                  <Label>Công việc tự do</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex justify-end gap-2 fixed bottom-0 left-0 right-0 bg-background px-10 py-4 border-t ">
        <Button
          size={"lg"}
          variant={"secondary"}
          onClick={() => dispatch(prevStep())}
        >
          Quay lại
        </Button>
        <Button size={"lg"} onClick={() => dispatch(nextStep())}>
          Hoàn thành
        </Button>
      </div>
    </div>
  );
};

export default RequirementInfo;
