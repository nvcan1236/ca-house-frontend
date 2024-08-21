import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { IMotel } from "@/utils/interfaces";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Motel = ({ motel }: { motel: IMotel }) => {
  const [hoved, setHovered] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

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
        <CarouselContent onClick={() => navigate(`./motels/${motel?.id}`)}>
          {motel?.images.map((image) => (
            <CarouselItem className="" key={image.id}>
              <div className=" h-[160px] text-3xl font-bold flex items-center justify-center bg-background ">
                <img src={image.url} alt="" />
              </div>
            </CarouselItem>
          ))}
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
      <div className="p-3 text-sm">
        <div className="flex gap-2 items-center">
          <p
            className="text-left font-medium flex-1 overflow-ellipsis line-clamp-1"
            onClick={() => navigate(`./motels/${motel.id}`)}
          >
            {motel?.name}
          </p>
          <Badge
            variant="default"
            className="text-xs bg-main-yellow-t6 text-main-blue hover:bg-main-yellow"
          >
            {motel?.type?.toLowerCase()}
          </Badge>
        </div>
        <div className="flex gap-2 items-center justify-between mt-3">
          <span>Diện tích: {motel?.area}m2</span>
          <span className="font-semibold text-main-blue text-lg">
            {motel?.price}/<span className="text-xs">tháng</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Motel;
