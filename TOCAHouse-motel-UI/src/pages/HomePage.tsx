import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container grid grid-cols-4 gap-3 p-8">
        <PostSkeleton></PostSkeleton>
        <PostSkeleton></PostSkeleton>
        <PostSkeleton></PostSkeleton>
        {Array.from(new Array(20)).map((_, i) => (
          <Post key={i} onClick={() => navigate(`./motels/${i}`)} />
        ))}
      </div>
    </div>
  );
};

const Post = ({ onClick }: { onClick: MouseEventHandler<HTMLDivElement> }) => {
  const [hoved, setHovered] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="overflow-hidden border rounded-lg shadow-sm bg-background cursor-pointer"
      
    >
      <Carousel setApi={setApi} className="relative">
        <CarouselContent onClick={onClick}>
            <CarouselItem className="">
              <div className=" h-[160px] text-3xl font-bold flex items-center justify-center bg-background ">
                <img
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
              </div>
            </CarouselItem>
            <CarouselItem className="">
              <div className=" h-[160px] text-3xl font-bold flex items-center justify-center bg-background ">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661846577575-560fd37a2a19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW90ZWx8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
              </div>
            </CarouselItem>
            <CarouselItem className="">
              <div className=" h-[160px] text-3xl font-bold flex items-center justify-center bg-background ">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
              </div>
            </CarouselItem>
        </CarouselContent>
        {hoved && (
          <>
            <div className="absolute z-10 flex items-center justify-center gap-1 py-2 -translate-x-1/2 bottom-2 left-1/2">
              {Array.from(new Array(count)).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full bg-slate-100 ${
                    i + 1 === current ? "!bg-white !h-[10px] !w-[10px]" : ""
                  }`}
                ></div>
              ))}
            </div>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
      <p className="p-3 text-left" onClick={onClick}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, ullam!
      </p>
    </div>
  );
};

const PostSkeleton = () => {
  return (
    <div className="overflow-hidden border rounded-lg shadow-sm bg-background">
      <div className="p-2">
        <Skeleton className="w-full h-[160px]"></Skeleton>
      </div>
      <div className="p-3">
        <Skeleton className="w-full h-6"></Skeleton>
        <Skeleton className="w-[120px] h-6 mt-2"></Skeleton>
      </div>
    </div>
  );
};

export default HomePage;
