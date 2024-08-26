import DecorativeHeading from "@/components/common/DecorativeHeading";
import { Button } from "@/components/ui/button";
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
          <div className="text-lg text-slate-600 mb-12 flex-1"></div>
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
