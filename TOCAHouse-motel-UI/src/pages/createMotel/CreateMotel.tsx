import H3 from "@/components/common/H3";
import MapInCreate from "@/components/common/MapInCreate";
import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { nextStep } from "@/stores/slices/createMotelSlice";
import { steps } from "@/utils/predefinedData";

const CreateMotel = () => {
  const currentStep = useAppSelector((state) => state.createMotel.currentStep);
  const dispatch = useAppDispatch();

  if (!currentStep)
    return (
      <div className="flex  gap-10 lg:px-10">
        <div className=" w-1/2">
          <H3 className="!text-5xl mb-5 mt-10 text-main-blue-s3">
            Bắt đầu cho thuê chỉ với vài bước đăng ký
          </H3>
          <p className="text-lg text-slate-600 mb-12">
            Mọi người sẽ dễ dàng tìm thấy bạn hơn khi đăng ký với caHouse. Và
            sau đó trọ của bạn sẽ xuất hiện trên bản đò của chúng tôi
          </p>
          <Button size={"lg"} onClick={() => dispatch(nextStep())}>
            Đăng ký ngay
          </Button>
        </div>
        <div className="w-1/2 h-[500px]">
          <MapInCreate></MapInCreate>
        </div>
      </div>
    );

  return <div className="lg:px-10">{steps[currentStep].component}</div>;
};

export default CreateMotel;
