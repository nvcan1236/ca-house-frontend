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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { useGetMotelQuery } from "@/stores/api/motelApi";
import ImageSlider from "@/components/common/ImageSlider";
import DetailMotelSkeleton from "@/components/list/DetailMotelSkeleton";

const DetailMotel = () => {
  const { motelId } = useParams();
  const { data, isLoading } = useGetMotelQuery(motelId || "");
  const detailMotel = data?.result;
  if (isLoading) return <DetailMotelSkeleton />;

  return (
    <div className="container w-[1200px] mt-10">
      <Dialog>
        <DialogTrigger>
          <div className="grid grid-cols-4 gap-4  mx-auto rounded-xl overflow-hidden ">
            <div className="col-span-2 row-span-2">
              <img
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="">
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="">
              <img
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="">
              <img
                src="https://images.unsplash.com/photo-1579762687857-b2f08f7cd067?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW90ZWx8ZW58MHx8MHx8fDA%3D"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="last:opacity-40">
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="p-8 max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Một vài hình ảnh của trọ</DialogTitle>
          </DialogHeader>
          <ImageSlider height={300} images={[]} />
        </DialogContent>
      </Dialog>
      <div className="flex mt-12 gap-8 items-start ">
        <div className="w-2/3 flex flex-col gap-6">
          <div>
            <div>
              <h3 className="text-3xl ">{detailMotel?.name}</h3>
              <p className="font-light text-slate-600">
                {detailMotel?.description}
              </p>

              <p className="text-xl font-medium mt-5 flex justify-between items-center">
                <span>
                  <MapPinnedIcon className="inline-block mr-3" /> 1454, Lê Văn
                  Lương, Phước Kiển, Nhà Bè, Tp.HCM
                </span>
                <Button variant={"outline"}>
                  <MapIcon size={20} className="mr-2" /> Xem trên bản đồ
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
            <Button className="p-4 ">
              <CalendarIcon size={16} className="mr-2" /> Hẹn ngày xem phòng
            </Button>
            <Button variant={"secondary"} className="p-4">
              <HeartIcon size={16} className="mr-2" /> Thêm vào danh sách yêu
              thích
            </Button>
          </div>

          <div className="">
            <DecorativeHeading>Tiện nghi</DecorativeHeading>
            <div className="mt-4 pl-3">
              <p>
                <Label>Nội thất:</Label> <span>Tủ lạnh, máy giặt, sofa</span>
              </p>
              <p>
                <Label>Vị trí:</Label> <span>Gần siêu thị, chợ, tập hoá</span>
              </p>
              <p>
                <Label>An ninh:</Label> <span>Camera, Khoá từ</span>
              </p>
            </div>
          </div>

          <div className="">
            <DecorativeHeading>Yêu cầu từ chủ trọ</DecorativeHeading>
            <div className="mt-4 pl-3">
              <p>
                <Label>Thú cưng:</Label> <span>Không nuôi thú cưng</span>
              </p>
              <p>
                <Label>Đối tượng cho thuê:</Label>{" "}
                <span>Học sinh, sinh viên</span>
              </p>
              <p>
                <Label>Hợp đồng:</Label> <span>Tối thiểu 3 tháng</span>
              </p>
            </div>
          </div>

          <div className="">
            <DecorativeHeading>Thông tin chủ trọ</DecorativeHeading>
            <div className="py-6 px-8 border rounded-xl  mt-4 flex gap-4 bg-background shadow-md">
              <Avatar className="size-20 border">
                <AvatarImage src=""></AvatarImage>
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div>
                <Link to={`/profile/${detailMotel?.ownerId}`} className="p-0">
                  {detailMotel?.ownerId}
                </Link>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minus, enim!
                </p>
                <Button className="mt-4">
                  <MessageCircle size={20} className="mr-2"></MessageCircle>{" "}
                  Nhắn tin cho chủ nhà{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 border border-main-yellow-t6 p-4 rounded-xl bg-background sticky top-40">
          <DecorativeHeading>Giá cả</DecorativeHeading>
          <div className="flex flex-col gap-3 mt-4">
            <Item>
              <Label>Giá thuê: </Label>
              <p className="text-sm text-slate-700">
                <span className="text-lg text-main-blue font-medium">
                  {detailMotel?.price}đ{" "}
                </span>
                / tháng
              </p>
            </Item>
            <Item>
              <Label>Điện: </Label>
              <p className="text-sm text-slate-700">
                <span className="text-base text-foreground">3500đ</span>/ kWh
              </p>
            </Item>
            <Item>
              <Label>Nước: </Label>
              <p className="text-sm text-slate-700">
                <span className="text-base text-foreground">10000đ</span>/ m3
              </p>
            </Item>
            <Item>
              <Label>Wifi: </Label>
              <p className="text-sm text-slate-700">
                <span className="text-base text-foreground">100.000đ</span>/
                tháng
              </p>
            </Item>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          <div className="border rounded-lg bg-background flex gap-4 px-6 py-4">
            <Avatar>
              <AvatarImage></AvatarImage>
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-xs">Nguyễn Văn Cảnh</p>
              <p className="text-slate-600 text-sm mt-1">
                Phòng trọ sạch sẽ thoáng mát, rất ok.
              </p>
            </div>
          </div>
          <div className="border rounded-lg bg-background flex gap-4 px-6 py-4">
            <Avatar>
              <AvatarImage></AvatarImage>
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-xs">Nguyễn Văn Cảnh</p>
              <p className="text-slate-600 text-sm mt-1">
                Phòng trọ sạch sẽ thoáng mát, rất ok.
              </p>
            </div>
          </div>
          <div className="border rounded-lg bg-background flex gap-4 px-6 py-4">
            <Avatar>
              <AvatarImage></AvatarImage>
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-xs">Nguyễn Văn Cảnh</p>
              <p className="text-slate-600 text-sm mt-1">
                Phòng trọ sạch sẽ thoáng mát, rất ok.
              </p>
            </div>
          </div>
        </div>
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default DetailMotel;
