import DecorativeHeading from "@/components/common/DecorativeHeading";
import H3 from "@/components/common/H3";
import { Button } from "@/components/ui/button";
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
import { XIcon } from "lucide-react";
import { useState } from "react";

type Price = {
  type: PredefinePrice;
  name: string | null;
  price: number | null;
  unit: string[];
};

type PredefinePrice =
  | "ELECTRICITY"
  | "WATER"
  | "INTERNET"
  | "PARKING"
  | "ORTHER";

const PriceInfo = () => {
  const dispatch = useAppDispatch();

  const [additionalPrices, setAdditionalPrices] = useState<number[]>([]);
  const [prices, setPrices] = useState<Price[] | []>([
    { name: "Điện", price: null, unit: ["kWh", "month"], type: "ELECTRICITY" },
    { name: "Nước", price: null, unit: ["m3", "month"], type: "WATER" },
    { name: "Internet", price: null, unit: ["month"], type: "INTERNET" },
    { name: "Gửi xe", price: null, unit: ["month"], type: "PARKING" },
    // { name: "Khác", price: null, unit: "month" },
  ]);
  const updatePriceData = (type: PredefinePrice, value: number) => {
    const nextPrice = [...prices];
    const index = nextPrice.findIndex((price) => price.type === type);

    if (index !== -1) {
      nextPrice[index] = { ...nextPrice[index], price: value };
      setPrices(nextPrice);
    }
  };

  return (
    <div className="">
      <div className="flex gap-10 items-stretch">
        <div className="w-1/2 h-[500px] md:block hidden">
          <Skeleton className="size-full"></Skeleton>
        </div>
        <div className=" w-1/2 flex flex-col flex-1">
          <DecorativeHeading className="!text-2xl mb-5 text-main-blue-s3 mt-10">
            Các loại giá cả
          </DecorativeHeading>
          <div className=" mb-12 flex-1 flex flex-col gap-6">
            <div>
              <H3>Giá thuê hàng tháng</H3>
              <Input className="mt-3" type="number" placeholder="(VND)" />
            </div>

            <H3>Các chi phí bao gồm </H3>

            {prices.map((price) => (
              <div
                className="flex gap-3 items-center justify-between"
                key={price.name}
              >
                <Label className="w-[120px]">{price.name} </Label>
                <Input
                  type="number"
                  placeholder="(VND)"
                  className="flex-1"
                  onChange={(e) =>
                    updatePriceData(price.type, Number(e.target.value))
                  }
                />
                <Select defaultValue={price.unit[0]}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {price.unit.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            {/* <div className="flex gap-3 items-center justify-between">
              <Label className="w-[120px]">Điện </Label>
              <Input type="number" placeholder="(VND)" className="flex-1" />
              <Select defaultValue="kWh">
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kWh">kWh</SelectItem>
                  <SelectItem value="month">Tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 items-center justify-between">
              <Label className="w-[120px]">Nước</Label>
              <Input type="number" placeholder="(VND)" className="flex-1" />
              <Select defaultValue="m3">
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m3">Khối</SelectItem>
                  <SelectItem value="month">Tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 items-center justify-between">
              <Label className="w-[120px]">Internet</Label>
              <Input type="number" placeholder="(VND)" className="flex-1" />
              <Select defaultValue={"month"}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 items-center justify-between">
              <Label className="w-[120px]">Gửi xe</Label>
              <Input type="number" placeholder="(VND)" className="flex-1" />
              <Select defaultValue={"month"}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Tháng</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {additionalPrices.map((add) => (
              <div
                className="flex gap-3 items-center justify-between"
                key={add}
              >
                <Input
                  type="text"
                  placeholder="Tên chi phí"
                  className="w-[120px]"
                />
                <Input
                  type="number"
                  placeholder="Giá (VND)"
                  className="flex-1"
                />
                <Input type="text" placeholder="Đơn vị" className="w-[100px]" />
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="border-destructive text-destructive"
                  type="button"
                  onClick={() =>
                    setAdditionalPrices(() => [
                      ...additionalPrices.filter((i) => i !== add),
                    ])
                  }
                >
                  <XIcon size={20}></XIcon>
                </Button>
              </div>
            ))}

            <Button
              variant={"outline"}
              type="button"
              onClick={() =>
                setAdditionalPrices([
                  ...additionalPrices,
                  additionalPrices.length,
                ])
              }
            >
              Thêm chi phí
            </Button>
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
                console.log(prices)
                // dispatch(nextStep());
              }}
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// const PriceItem = () => {
//   <div className="flex gap-3 items-center justify-between">
//     <Label className="w-[120px]">Gửi xe</Label>
//     <Input type="number" placeholder="(VND)" className="flex-1" />
//     <Select defaultValue={"month"}>
//       <SelectTrigger className="w-[100px]">
//         <SelectValue />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectItem value="month">Tháng</SelectItem>
//       </SelectContent>
//     </Select>
//   </div>;
// };

export default PriceInfo;
