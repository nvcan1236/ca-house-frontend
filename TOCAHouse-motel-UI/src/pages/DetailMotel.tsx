import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams } from "react-router-dom";

const DetailMotel = () => {
  const { motelId } = useParams();
  return (
    <div className="container w-[1200px]">
      <Dialog>
        <DialogTrigger>
          <div className="grid grid-cols-4 gap-4  mx-auto rounded-xl overflow-hidden mt-10">
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
          <Carousel>
              <img
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                alt=""
                className="w-full h-[400px] object-cover"
              />
            <CarouselContent className="h-[100px] mt-4">
              <CarouselItem className="basis-1/5">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
              <CarouselItem className="basis-1/5">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
              <CarouselItem className="basis-1/5">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
              <CarouselItem className="basis-1/5">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
              <CarouselItem className="basis-1/5">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
              <CarouselItem className="basis-1/5">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselNext className="right-2" />
            <CarouselPrevious className="left-2" />
          </Carousel>
        </DialogContent>
      </Dialog>
      <div className="flex mt-12 gap-8">
        <div className="w-2/3">
          <h3 className="text-3xl ">Detail Motel {motelId}</h3>
          <p>Lorem ipsum dolor sit.</p>
          <p>
            Lorem ipsum dolor sit. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Error iusto, illum molestiae quaerat harum totam.
          </p>
          <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit.</p>
        </div>
        <div className="flex-1 border border-main-yellow p-4 rounded-xl bg-background shadow-lg">
          <p>Giá cả</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus nisi delectus eveniet, illo vel ipsa.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
            modi accusamus minima hic saepe fugit, laboriosam ducimus voluptatum
            adipisci ea doloremque labore, possimus perferendis assumenda at
            harum, provident deleniti soluta.
          </p>
          <Button className="mt-4 w-full">Đặt cọc</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailMotel;
