import DecorativeHeading from "@/components/common/DecorativeHeading";
import MotelRegularForm from "@/components/form/MotelRegularForm";
import { Skeleton } from "@/components/ui/skeleton";

const RegularInfo = () => {
  return (
    <div className="">
      <div className="flex gap-10 items-stretch">
        <div className="w-1/2 h-[500px] md:block hidden">
          <Skeleton className="size-full"></Skeleton>
        </div>
        <div className=" w-1/2 flex flex-col flex-1">
          <DecorativeHeading className="text-xl mb-5 text-main-blue-s3 mt-10">
            Các thông tin cơ bản
          </DecorativeHeading>
          <div className="text-lg text-slate-600 mb-12 flex-1">
            <MotelRegularForm></MotelRegularForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularInfo;
