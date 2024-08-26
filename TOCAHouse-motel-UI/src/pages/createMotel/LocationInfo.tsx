import DecorativeHeading from "@/components/common/DecorativeHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/stores/hooks";
import { nextStep, prevStep } from "@/stores/slices/createMotelSlice";

const LocationInfo = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="">
      <div className="flex flex-col gap-10">
        <div className="w-[800px] mx-auto">
          <DecorativeHeading className="!text-2xl mb-5 text-main-blue-s3 mt-10">
            Thêm vị trí
          </DecorativeHeading>
  
          <div className=" h-[400px] bg-green-300 p-2">
            <Input placeholder="Nhập địa chỉ trọ của bạn..." className="rounded-lg"></Input>
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
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
