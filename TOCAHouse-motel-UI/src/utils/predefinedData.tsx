import {
  BedIcon,
  Building,
  HouseIcon,
  SchoolIcon,
  AirVentIcon,
  ArmchairIcon,
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
import { Job, MotelStatus, MotelType, Price } from "./types";

export const motelTypes: MotelType[] = [
  {
    label: "Phòng đơn",
    icon: <HouseIcon size={32}></HouseIcon>,
    value: "SINGLE_ROOM",
  },
  {
    label: "Nhà nguyên căn",
    icon: <SchoolIcon size={32}></SchoolIcon>,
    value: "WHOLE_HOUSE",
  },
  {
    label: "Căn hộ chung cư",
    icon: <Building size={32}></Building>,
    value: "APARTMENT",
  },
  {
    label: "Ký túc xá",
    icon: <BedIcon size={32}></BedIcon>,
    value: "DORMITORY",
  },
];

export const motelStatus: MotelStatus[] = [
  {
    label: "Còn sẵn",
    value: "AVAILABLE",
  },
  {
    label: "Đang cho thuê",
    value: "RENTING",
  },
];

export const services = [
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

export const furnitures = [
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

export const facilities = [
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
export const prices: Price[] = [
  {
    name: "Điện",
    price: null,
    unit: "kWh",
    units: ["kWh", "month"],
    type: "ELECTRICITY",
  },
  {
    name: "Nước",
    price: null,
    unit: "m3",
    units: ["m3", "month"],
    type: "WATER",
  },
  {
    name: "Internet",
    price: null,
    unit: "month",
    units: ["month"],
    type: "INTERNET",
  },
  {
    name: "Gửi xe",
    price: null,
    unit: "month",
    units: ["month"],
    type: "PARKING",
  },
  {
    name: "Dịch vụ",
    price: null,
    unit: "month",
    units: ["month"],
    type: "SERVICE",
  },
];
export const definedJobs: { type: Job; label: string }[] = [
  {
    type: "STUDENT",
    label: "Học sinh, sinh viên",
  },
  {
    type: "OFFICER",
    label: "Nhân viên văn phòng",
  },
  {
    type: "WORKER",
    label: "Công nhân",
  },
  {
    type: "FREELANCER",
    label: "Làm việc tự do",
  },
  {
    type: "OTHER",
    label: "Khác",
  },
];