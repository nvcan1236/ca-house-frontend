import DecorativeHeading from "@/components/common/DecorativeHeading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, HeartIcon, MapIcon, MapPinnedIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Item from "@/components/common/Item";
import { Separator } from "@/components/ui/separator";
import {
  useBookAppointmentMutation,
  useGetMotelQuery,
} from "@/stores/api/motelApi";
import ImageSlider from "@/components/common/ImageSlider";
import DetailMotelSkeleton from "@/components/list/DetailMotelSkeleton";
import { Amenity } from "@/utils/types";
import MotelReview from "@/components/common/MotelReview";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const DetailMotel = () => {
  const { motelId } = useParams();
  const { data, isLoading } = useGetMotelQuery(motelId || "");
  const detailMotel = data?.result;
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookAppointment] = useBookAppointmentMutation();

  if (isLoading) return <DetailMotelSkeleton />;
  const amenityByType = detailMotel?.amenities.reduce((acc, item: Amenity) => {
    if (!item.type) return acc;

    if (!acc[item.type]) {
      acc[item.type] = [];
    }

    acc[item.type].push(item);

    return acc;
  }, {});

  return (
    <div className="container mt-10">
      <div className="lg:hidden">
        <ImageSlider
          images={data?.result.images || []}
          height={300}
        ></ImageSlider>
      </div>
      <div className="hidden lg:block">
        <Dialog>
          <DialogTrigger asChild>
            <div className="grid-cols-4 gap-4  mx-auto rounded-xl overflow-hidden grid w-full">
              {detailMotel?.images.slice(0, 5).map((image) => (
                <div
                  className="last:opacity-40 first:row-span-2 first:col-span-2 h-[200px] first:h-[416px]"
                  key={image.id}
                >
                  <img
                    src={image.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </DialogTrigger>
          <DialogContent className="p-8 max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>Một vài hình ảnh của trọ</DialogTitle>
            </DialogHeader>
            <ImageSlider height={500} images={detailMotel?.images || []} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex mt-12 gap-8 items-start ">
        <div className="lg:w-2/3 flex flex-col gap-6">
          <div>
            <div>
              <h3 className="text-3xl ">{detailMotel?.name}</h3>
              <p className="font-light text-slate-600">
                {detailMotel?.description}
              </p>

              <p className="text-xl font-medium mt-5 flex justify-between items-center gap-3">
                <span>
                  <MapPinnedIcon className="inline-block mr-3" />{" "}
                  {`
                  ${detailMotel?.location?.other}, 
                  ${detailMotel?.location?.street}, 
                  ${detailMotel?.location?.ward}, 
                  ${detailMotel?.location?.district}, 
                  ${detailMotel?.location?.city} 
                  `}
                </span>
                <Button variant={"outline"} className="flex -gap-2">
                  <MapIcon size={20} />{" "}
                  <span className="hidden lg:inline">Xem trên bản đồ</span>
                </Button>
              </p>
            </div>
            <div className="py-6 px-2 rounded-xl border border-main-yellow-t6 flex bg-background mt-4">
              <div className="flex-1 flex flex-col gap-4 items-center">
                <Label className="text-slate-500">Diện tích</Label>{" "}
                <span className="font-medium text-lg">
                  {detailMotel?.area}m2
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-4 items-center">
                <Label className="text-slate-500">Loại phòng</Label>{" "}
                <Badge className="px-4 bg-main-yellow-t6 text-main-blue-s3 font-normal text-md pb-1">
                  {detailMotel?.type.toLowerCase()}
                </Badge>
              </div>
              <div className="flex-1 flex flex-col gap-4 items-center">
                <Label className="text-slate-500">Phòng trống từ</Label>{" "}
                <span className="font-medium text-lg">
                  {detailMotel?.availableDate
                    ? new Date(detailMotel?.availableDate).toLocaleDateString(
                        "vi"
                      )
                    : "Bây giờ"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="p-4 ">
                  <CalendarIcon size={16} className="mr-2" /> Hẹn ngày xem phòng
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                <Button
                  className="block mt-3 ml-auto"
                  onClick={() =>
                    bookAppointment({
                      motelId: detailMotel?.id || "",
                      date: date?.toISOString() || "",
                    })
                  }
                >
                  Đặt
                </Button>
              </PopoverContent>
            </Popover>

            <Button variant={"secondary"} className="p-4">
              <HeartIcon size={16} className="mr-2" /> Thêm vào danh sách yêu
              thích
            </Button>
          </div>

          {/* GIÁ: CHỈ HIỆN Ở MOBILE, TABLET */}
          <div className="border border-main-yellow-t6 p-4 rounded-xl bg-background lg:hidden">
            <DecorativeHeading>Giá cả</DecorativeHeading>
            <div className="flex flex-col gap-3 mt-4">
              <Item>
                <Label>Giá thuê: </Label>
                <p className="text-sm text-slate-700">
                  <span className="text-lg text-main-blue font-medium">
                    {Number(detailMotel?.price).toLocaleString()}đ{" "}
                  </span>
                  / tháng
                </p>
              </Item>
              {detailMotel?.prices.map((price) => (
                <Item key={price.type}>
                  <Label>{price.name}: </Label>
                  <p className="text-sm text-slate-700">
                    <span className="text-base text-foreground">
                      {Number(price.value).toLocaleString("vi")}đ
                    </span>
                    / {price.unit}
                  </p>
                </Item>
              ))}
            </div>
            <Separator className="mt-4 mb-2"></Separator>
            <p className="text-slate-600 text-xs">
              Nếu bạn muốn giữ phòng này đến khi thuê ban có thể đặt cọc phòng
              này. Sau khi đặt cọc phòng sẽ bị ẩn với các người khác. Tiền đặt
              cọc mỗi ngày sẽ bằng giá thuê chia 30.
            </p>
            <Button className="mt-4 w-full">Đặt cọc</Button>
          </div>

          <div>
            <DecorativeHeading>Tiện nghi</DecorativeHeading>
            <div className="mt-4 pl-3">
              {/* {Object.keys(amenityByType).map()} */}
              {Object.keys(amenityByType).map((type) => (
                <p key={type}>
                  <Label>{type}:</Label>{" "}
                  <div className="inline-block">
                    {amenityByType[type].map((amenity) => (
                      <span key={amenity.name}>{amenity.name},</span>
                    ))}
                  </div>
                </p>
              ))}
            </div>
          </div>

          <div className="">
            <DecorativeHeading>Yêu cầu từ chủ trọ</DecorativeHeading>
            <div className="mt-4 pl-3">
              {detailMotel?.requirement &&
                Object.keys(detailMotel?.requirement).map((req) => (
                  <p key={req}>
                    <Label>{req}:</Label>{" "}
                    <span>{detailMotel?.requirement[req]}</span>
                  </p>
                ))}
            </div>
          </div>

          <div className="">
            <DecorativeHeading>Thông tin chủ trọ</DecorativeHeading>
            <div className="py-6 px-8 border rounded-xl  mt-4 flex gap-4 bg-background shadow-md">
              <Avatar className="size-20 border">
                <AvatarImage src=""></AvatarImage>
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <Link to={`/profile/${detailMotel?.ownerId}`} className="p-0">
                  {detailMotel?.ownerId}
                </Link>

                <Button className="mt-4 flex">
                  <MessageCircle size={20} className="mr-2"></MessageCircle>{" "}
                  Nhắn tin cho chủ nhà{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 border border-main-yellow-t6 p-4 rounded-xl bg-background sticky top-40 hidden lg:block">
          <DecorativeHeading>Giá cả</DecorativeHeading>
          <div className="flex flex-col gap-3 mt-4">
            <Item>
              <Label>Giá thuê: </Label>
              <p className="text-sm text-slate-700">
                <span className="text-lg text-main-blue font-medium">
                  {Number(detailMotel?.price).toLocaleString()}đ{" "}
                </span>
                / tháng
              </p>
            </Item>
            {detailMotel?.prices.map((price) => (
              <Item key={price.type}>
                <Label>{price.name}: </Label>
                <p className="text-sm text-slate-700">
                  <span className="text-base text-foreground">
                    {Number(price.value).toLocaleString("vi")}đ
                  </span>
                  / {price.unit}
                </p>
              </Item>
            ))}
          </div>
          <Separator className="mt-4 mb-2"></Separator>
          <p className="text-slate-600 text-xs">
            Nếu bạn muốn giữ phòng này đến khi thuê ban có thể đặt cọc phòng
            này. Sau khi đặt cọc phòng sẽ bị ẩn với các người khác. Tiền đặt cọc
            mỗi ngày sẽ bằng giá thuê chia 30.
          </p>
          <Button className="mt-4 w-full">Đặt cọc</Button>
        </div>
      </div>

      <div className=" mt-8">
        <DecorativeHeading>Đánh giá</DecorativeHeading>
        <MotelReview motelId={motelId || ""} />
      </div>
    </div>
  );
};

export default DetailMotel;
