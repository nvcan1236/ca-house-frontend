import H3 from "@/components/common/H3";
import Item from "@/components/common/Item";
import DatePickerNoForm from "@/components/form/DatePickerNoForm";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import { Textarea } from "@/components/ui/textarea";
import { getDistricts, getProvinces, getWards } from "@/configs/provincesData";
import { District, Ward } from "@/utils/interfaces";
import {
  definedJobs,
  facilities,
  furnitures,
  motelStatus,
  motelTypes,
  prices,
  services,
} from "@/utils/predefinedData";
import { Location } from "@/utils/types";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";

const DetailMotelManage = () => {
  const provinces = getProvinces();
  const [districtList, setDistrictList] = useState<District[]>([]);
  const [wardList, setWardList] = useState<Ward[]>([]);
  // const [locationList, setLocationList] = useState([]);
  const [location, setLocation] = useState<Location>({
    city: "",
    district: "",
    ward: "",
    street: "",
    other: "",
    longitude: null,
    latitude: null,
  });
  return (
    <div className="flex lg:flex-row flex-col gap-6 mt-6 items-start lg:px-10">
      <section className="lg:w-1/3 w-full p-6 border rounded-lg bg-slate-50 lg:sticky lg:top-10">
        <H3>Thông tin cơ bản</H3>
        <div className="flex flex-col gap-3 mt-4 ml-3">
          <Item>
            <Label className="w-[200px]">Tên</Label>
            <Input></Input>
          </Item>
          <Item>
            <Label className="w-[200px]">Mô tả</Label>
            <Input></Input>
          </Item>
          <Item>
            <Label className="w-[200px]">Giá thuê</Label>
            <Input></Input>
          </Item>
          <Item>
            <Label className="w-[200px]">Diện tích</Label>
            <Input></Input>
          </Item>
          <Item>
            <Label className="w-[200px]">Loại phòng</Label>
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {motelTypes.map((type) => (
                  <SelectItem value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Item>

          <Item>
            <Label className="w-[200px]">Ngày cho thuê</Label>
            <DatePickerNoForm
              value={new Date()}
              onChange={() => {
                console.log("aaaa");
              }}
            />
          </Item>
          <Item>
            <Label className="w-[200px]">Trạng thái</Label>
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {motelStatus.map((status) => (
                  <SelectItem value={status.value}>{status.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Item>
        </div>
      </section>

      <div className="flex flex-col gap-10 flex-1 w-full border rounded-lg p-6 bg-slate-50 ">
        <section>
          <H3>Vị trí</H3>
          <div className="flex flex-col gap-3 mt-4 ml-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">Tỉnh, thành phồ</Label>
                <Select
                  defaultValue={""}
                  onValueChange={(value) => {
                    setLocation({ ...location, city: value });
                    setDistrictList(getDistricts(value));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province.name} value={province.name}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">Quận huyện</Label>
                <Select
                  defaultValue={""}
                  onValueChange={(value) => {
                    setLocation({ ...location, district: value });
                    setWardList(getWards(location.city, value));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {districtList?.map((district) => (
                      <SelectItem key={district.name} value={district.name}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="citya">Xã, Phường</Label>
                <Select
                  defaultValue={""}
                  // onValueChange={(value) => {
                  //   setLocation({ ...location, ward: value });
                  // }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {wardList.map((province) => (
                      <SelectItem key={province.name} value={province.name}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex-1 flex gap-3 ">
              <div className="flex-1">
                <Label htmlFor="city">Đường</Label>
                <Input
                  placeholder="Tên đường..."
                  value={location.street}
                  onChange={(e) =>
                    setLocation({ ...location, street: e.target.value })
                  }
                ></Input>
              </div>
              <div className="flex-1">
                <Label htmlFor="city">Địa chỉ khác (Tự chọn)</Label>
                <Input
                  placeholder={`Ấp, xóm,..`}
                  value={location.other}
                  onChange={(e) =>
                    setLocation({ ...location, other: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <Item className="!justify-start gap-10">
            <H3>Hình ảnh </H3>
            <Button size={"sm"} variant={"outline"}>
              <PlusIcon size={16} className="mr-2" /> Thêm ảnh
            </Button>
          </Item>
          <div className="gap-4 ml-3 ">
            <Carousel className="w-full">
              <CarouselContent className="pt-4 pr-4">
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <ImageAction />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <ImageAction />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <ImageAction />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <ImageAction />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <ImageAction />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-2" />
              <CarouselNext className="absolute right-6" />
            </Carousel>
          </div>
        </section>

        <section>
          <H3>Tiện ích</H3>
          <div className="gap-3 mt-4 ml-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label>Dịch vụ</Label>
              <div className="flex flex-col gap-2 mt-2">
                {services.map((service) => (
                  <Item className="!justify-start gap-3">
                    <Checkbox id={service.value} value={service.value} />
                    <Label htmlFor={service.value}>{service.label}</Label>
                  </Item>
                ))}
              </div>
            </div>
            <div>
              <Label>Nội thất</Label>
              <div className="flex flex-col gap-2 mt-2">
                {furnitures.map((furniture) => (
                  <Item className="!justify-start gap-3">
                    <Checkbox id={furniture.value} value={furniture.value} />
                    <Label htmlFor={furniture.value}>{furniture.label}</Label>
                  </Item>
                ))}
              </div>
            </div>
            <div>
              <Label>Tiện ích</Label>
              <div className="flex flex-col gap-2 mt-2">
                {facilities.map((facility) => (
                  <Item className="!justify-start gap-3">
                    <Checkbox id={facility.value} value={facility.value} />
                    <Label htmlFor={facility.value}>{facility.label}</Label>
                  </Item>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <H3>Giá cả</H3>
          <div className="flex flex-col gap-3 mt-4 ml-3">
            <div className="flex-1 flex flex-col gap-6">
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
                    // value={price.price}
                    // onChange={(e) =>
                    //   updatePriceData(price.type, Number(e.target.value))
                    // }
                  />

                  <Select
                    defaultValue={price.unit}
                    // onValueChange={(value) => updateUnit(price.type, value)}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {price.units.map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {price.type === "ORTHER" && (
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className="border-destructive text-destructive hover:text-destructive"
                      type="button"
                      // onClick={() => {
                      //   let nextPrice = [...prices];
                      //   nextPrice = nextPrice.filter(
                      //     (p) => p.name !== price.name
                      //   );
                      //   setPrices(nextPrice);
                      // }}
                    >
                      <XIcon size={20}></XIcon>
                    </Button>
                  )}
                </div>
              ))}

              <div className="flex gap-3 items-center justify-between">
                <Label className="w-[120px]">Chi phí khác</Label>
                <Input
                  type="text"
                  placeholder="Tên chi phí"
                  className="w-[120px]"
                  // value={otherPrice.name}
                  // onChange={(e) =>
                  //   setOtherPrice({ ...otherPrice, name: e.target.value })
                  // }
                />
                <Input
                  type="number"
                  placeholder="Giá (VND)"
                  className="flex-1"
                  // value={otherPrice.price}
                  // onChange={(e) =>
                  //   setOtherPrice({
                  //     ...otherPrice,
                  //     price: Number(e.target.value),
                  //   })
                  // }
                />
                <Input
                  type="text"
                  placeholder="Đơn vị"
                  className="w-[100px]"
                  // value={otherPrice.unit}
                  // onChange={(e) =>
                  //   setOtherPrice({ ...otherPrice, units: [e.target.value] })
                  // }
                />
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="border-green-600 text-green-600"
                  type="button"
                  // onClick={() => {
                  //   setPrices([...prices, otherPrice]);
                  // }}
                  // disabled={Object.values(otherPrice).some((v) => !v)}
                >
                  <PlusIcon size={20}></PlusIcon>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <H3>Yêu cầu</H3>
          <div className="flex flex-col gap-3 mt-4 ml-3">
            <div className="mb-12 flex-1 flex flex-col gap-6">
              <div>
                <Label>Yêu cầu cọc</Label>
                <Input
                  type="number"
                  // value={requirement?.deposit}
                  // onChange={(e) => handleChange("deposit", e.target.value)}
                ></Input>
              </div>
              <div>
                <Label>Hợp đồng (tháng)</Label>
                <Input
                  type="number"
                  // value={requirement?.contractAmount}
                  // onChange={(e) => handleChange("contractAmount", e.target.value)}
                ></Input>
              </div>
              <div className="flex items-center gap-4">
                <Label>Cho nuôi thú cưng</Label>
                <Checkbox
                  className="size-6"
                  id="terms"
                  // checked={requirement?.allowPet}
                  // onCheckedChange={(e) => handleChange("allowPet", e)}
                />
              </div>
              <div>
                <Label>Đối tượng cho thuê</Label>
                <div className="mt-3 ml-4 ">
                  {definedJobs.map((job) => (
                    <div
                      className="flex items-center mt-3 gap-3"
                      key={job.type}
                    >
                      <Checkbox
                        id="terms"
                        // checked={requirement?.jobs.includes(job.type)}
                        // onCheckedChange={() => handleChange("jobs", job.type)}
                      />
                      <Label>{job.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Yêu cầu khác</Label>
                <Textarea
                  // value={requirement?.other}
                  // onChange={(e) => handleChange("other", e.target.value)}
                ></Textarea>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ImageAction = ({ src }: { src?: string }) => {
  return (
    <div className="relative aspect-video">
      <img
        src={src}
        alt=""
        className="object-cover size-full rounded-sm"
      />
      <Button
        variant={"outline"}
        size={"icon"}
        className="rounded-full  size-6 absolute -top-3 -right-3 "
      >
        <XIcon size={16} />
      </Button>
    </div>
  );
};

export default DetailMotelManage;
