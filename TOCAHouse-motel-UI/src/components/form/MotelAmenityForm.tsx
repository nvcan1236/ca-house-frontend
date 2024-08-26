import H3 from "../common/H3";
import {
  AirVentIcon,
  ArmchairIcon,
  BedIcon,
  BikeIcon,
  BusFrontIcon,
  BusIcon,
  CarrotIcon,
  CctvIcon,
  DoorClosedIcon,
  FireExtinguisherIcon,
  HeaterIcon,
  HospitalIcon,
  RefrigeratorIcon,
  School2Icon,
  ShirtIcon,
  SoupIcon,
  StoreIcon,
  WashingMachineIcon,
  WifiIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { nextStep, prevStep } from "@/stores/slices/createMotelSlice";
import { useAppDispatch } from "@/stores/hooks";

const MotelAmenityForm = () => {
  const dispatch = useAppDispatch();
  const services = [
    {
      label: "Nhà gửi xe",
      value: "NHAXE",
      icon: <BikeIcon size={32} />,
    },
    {
      label: "Dịch vụ giặt ủi",
      value: "NHAXE",
      icon: <WashingMachineIcon size={32} />,
    },
    {
      label: "An ninh, bảo vệ",
      value: "NHAXE",
      icon: <CctvIcon size={32} />,
    },
    {
      label: "Phòng cháy chữa cháy",
      value: "NHAXE",
      icon: <FireExtinguisherIcon size={32} />,
    },
    {
      label: "Wifi, Internet",
      value: "NHAXE",
      icon: <WifiIcon size={32} />,
    },
    {
      label: "Thang máy",
      value: "NHAXE",
      icon: <DoorClosedIcon size={32} />,
    },
  ];

  const furnitures = [
    {
      label: "Giường, nệm",
      value: "NHAXE",
      icon: <BedIcon size={32} />,
    },
    {
      label: "Tủ lạnh",
      value: "NHAXE",
      icon: <RefrigeratorIcon size={32} />,
    },
    {
      label: "Máy giặt",
      value: "NHAXE",
      icon: <WashingMachineIcon size={32} />,
    },
    {
      label: "Tủ, giá treo đồ",
      value: "NHAXE",
      icon: <ShirtIcon size={32} />,
    },
    {
      label: "Bếp, kệ bếp",
      value: "NHAXE",
      icon: <HeaterIcon size={32} />,
    },
    {
      label: "Máy lạnh",
      value: "NHAXE",
      icon: <AirVentIcon size={32} />,
    },
    {
      label: "Bàn ghế",
      value: "NHAXE",
      icon: <ArmchairIcon size={32} />,
    },
  ];

  const facilities = [
    {
      label: "Nhà thuốc, Bênh viện",
      value: "NHAXE",
      icon: <HospitalIcon size={32} />,
    },
    {
      label: "Trường học",
      value: "NHAXE",
      icon: <School2Icon size={32} />,
    },
    {
      label: "Chợ, tạp hoá",
      value: "NHAXE",
      icon: <CarrotIcon size={32} />,
    },
    {
      label: "Siêu thị, cửa hàng",
      value: "NHAXE",
      icon: <StoreIcon size={32} />,
    },
    {
      label: "Nhà hàng quán ăn",
      value: "NHAXE",
      icon: <SoupIcon size={32} />,
    },
    {
      label: "Trạm xe bus",
      value: "NHAXE",
      icon: <BusFrontIcon size={32} />,
    },
    {
      label: "Bến xe",
      value: "NHAXE",
      icon: <BusIcon size={32} />,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <H3 className="text-foreground">Các dịch vụ bao gồm</H3>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {services?.map((service) => (
            <div className="rounded-lg border px-6 py-4 text-center">
              <div className="w-fit mx-auto my-2">{service.icon}</div>
              <span>{service.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <H3 className="text-foreground">Nội thất trong phòng</H3>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {furnitures?.map((furniture) => (
            <div className="rounded-lg border px-6 py-4 text-center">
              <div className="w-fit mx-auto my-2">{furniture.icon}</div>
              <span>{furniture.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <H3 className="text-foreground">Các tiện ích xung quanh</H3>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {facilities?.map((facility) => (
            <div className="rounded-lg border px-6 py-4 text-center">
              <div className="w-fit mx-auto my-2">{facility.icon}</div>
              <span>{facility.label}</span>
            </div>
          ))}
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
  );
};

export default MotelAmenityForm;
