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
import { useState } from "react";

const MotelAmenityForm = () => {
  const dispatch = useAppDispatch();
  const services = [
    {
      label: "Nhà gửi xe",
      value: "GARAGE",
      icon: <BikeIcon size={32} />,
    },
    {
      label: "Dịch vụ giặt ủi",
      value: "IRON",
      icon: <WashingMachineIcon size={32} />,
    },
    {
      label: "An ninh, bảo vệ",
      value: "SECURITY",
      icon: <CctvIcon size={32} />,
    },
    {
      label: "Phòng cháy chữa cháy",
      value: "FIRE_PROTECTION",
      icon: <FireExtinguisherIcon size={32} />,
    },
    {
      label: "Wifi, Internet",
      value: "INTERNET",
      icon: <WifiIcon size={32} />,
    },
    {
      label: "Thang máy",
      value: "ELEVATOR",
      icon: <DoorClosedIcon size={32} />,
    },
  ];

  const furnitures = [
    {
      label: "Giường, nệm",
      value: "BED",
      icon: <BedIcon size={32} />,
    },
    {
      label: "Tủ lạnh",
      value: "FRIDGE",
      icon: <RefrigeratorIcon size={32} />,
    },
    {
      label: "Máy giặt",
      value: "WASHING_MACHINE",
      icon: <WashingMachineIcon size={32} />,
    },
    {
      label: "Tủ, giá treo đồ",
      value: "WARDROBE",
      icon: <ShirtIcon size={32} />,
    },
    {
      label: "Bếp, kệ bếp",
      value: "KITCHEN",
      icon: <HeaterIcon size={32} />,
    },
    {
      label: "Máy lạnh",
      value: "AC",
      icon: <AirVentIcon size={32} />,
    },
    {
      label: "Bàn ghế",
      value: "TABLE",
      icon: <ArmchairIcon size={32} />,
    },
  ];

  const facilities = [
    {
      label: "Nhà thuốc, Bênh viện",
      value: "HOSPITAL",
      icon: <HospitalIcon size={32} />,
    },
    {
      label: "Trường học",
      value: "SCHOOL",
      icon: <School2Icon size={32} />,
    },
    {
      label: "Chợ, tạp hoá",
      value: "MARKET",
      icon: <CarrotIcon size={32} />,
    },
    {
      label: "Siêu thị, cửa hàng",
      value: "SUPERMARKET",
      icon: <StoreIcon size={32} />,
    },
    {
      label: "Nhà hàng quán ăn",
      value: "FOOD_STALL",
      icon: <SoupIcon size={32} />,
    },
    {
      label: "Trạm xe bus",
      value: "BUSSTOP",
      icon: <BusFrontIcon size={32} />,
    },
    {
      label: "Bến xe",
      value: "STATION",
      icon: <BusIcon size={32} />,
    },
  ];

  type Data = {
    services: string[];
    furnitures: string[];
    facilities: string[];
  };

  const [data, setData] = useState<Data>({
    services: [],
    furnitures: [],
    facilities: [],
  });

  const updateData = (type: keyof Data, value: string) => {
    const newData = { ...data };
    if (newData[type].includes(value)) {
      newData[type] = newData[type].filter((i) => i != value);
    } else {
      newData[type].push(value);
    }

    setData(newData);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <H3 className="text-foreground">Các dịch vụ bao gồm</H3>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {services?.map((service) => (
            <div
              key={service.value}
              className={`rounded-lg border px-6 py-4 text-center ${
                data["services"].includes(service.value) &&
                "border-main-blue-s3 border-2"
              }`}
              onClick={() => updateData("services", service.value)}
            >
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
            <div
              key={furniture.value}
              className={`rounded-lg border px-6 py-4 text-center ${
                data["furnitures"].includes(furniture.value) &&
                "border-main-blue-s3 border-2"
              }`}
              onClick={() => updateData("furnitures", furniture.value)}
            >
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
            <div
              key={facility.value}
              className={`rounded-lg border px-6 py-4 text-center ${
                data["facilities"].includes(facility.value) &&
                "border-main-blue-s3 border-2"
              }`}
              onClick={() => updateData("facilities", facility.value)}
            >
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
        <Button
          size={"lg"}
          onClick={() => {
            console.log(data)
            dispatch(nextStep());
          }}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default MotelAmenityForm;
