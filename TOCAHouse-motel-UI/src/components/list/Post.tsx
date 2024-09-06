import {
  HouseIcon,
  MessageSquareTextIcon,
  SendHorizonalIcon,
} from "lucide-react";
import H3 from "../common/H3";
import ImageSlider from "../common/ImageSlider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useState } from "react";
import { Reaction } from "@/utils/types";
import { reactions } from "@/utils/predefinedData";

const Post = () => {
  const [currentReact, setCurrentReact] = useState<Reaction | null>(null);
  return (
    <div className="bg-background border rounded-xl p-6 pb-4">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex">
            <Avatar>
              <AvatarImage src="https://plus.unsplash.com/premium_photo-1661780440075-75263eb76824?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9zdHxlbnwwfHwwfHx8MA%3D%3D" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <p className="ml-2">
              <div className="flex gap-2 items-center">
                <H3 className="!text-base cursor-pointer">Nguyễn Văn Cảnh</H3>
                <Button
                  size={"sm"}
                  variant={"secondary"}
                  className="text-xs h-auto px-2 py-1"
                >
                  Theo dõi
                </Button>
              </div>
              <span className="text-sm font-medium text-main-yellow">
                Chủ trọ
              </span>
            </p>
          </div>
          <div className="justify-self-end text-end">
            <p className="text-slate-600 text-sm ">Đăng vào 5 giờ trước</p>
            <span className="font-semibold inline-block mt-px">TÌM PHÒNG</span>
          </div>
        </div>
        <div>
          <p className="">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
            illum, est aspernatur magnam tenetur excepturi libero fugiat nemo
            voluptatum repudiandae odio doloremque consequuntur dolorem magni
            ea. Aspernatur deserunt ducimus error!
          </p>
          <div className="mt-2 h-[300px]">
            <ImageSlider
              height={300}
              images={[
                {
                  id: "1",
                  url: "https://plus.unsplash.com/premium_photo-1667520199054-483939858acf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  id: "2",
                  url: "https://plus.unsplash.com/premium_photo-1667520199054-483939858acf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  id: "3",
                  url: "https://plus.unsplash.com/premium_photo-1667520199054-483939858acf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  id: "4",
                  url: "https://plus.unsplash.com/premium_photo-1667520199054-483939858acf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
              ]}
            ></ImageSlider>
          </div>
        </div>
        <div className="pt-3 border-t grid grid-cols-3">
          <div className="flex gap-2 items-center ">
            <HoverCard>
              <HoverCardTrigger
                className="pl-3 flex gap-2"
                onClick={() =>
                  setCurrentReact(currentReact ? null : reactions[0])
                }
              >
                {currentReact ? (
                  <span className="text-main-yellow">{currentReact.icon}</span>
                ) : (
                  <span className="text-slate-600">{reactions[0].icon}</span>
                )}
              </HoverCardTrigger>
              10 cảm xúc
              <HoverCardContent
                side="top"
                align="start"
                sideOffset={8}
                className="w-fit p-2"
              >
                {reactions.map((react) => (
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    key={react.type}
                    onClick={() => setCurrentReact(react)}
                  >
                    {react.icon}
                  </Button>
                ))}
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex items-center">
            <Dialog>
              <DialogTrigger className="flex gap-2 items-center pl-3">
                <MessageSquareTextIcon></MessageSquareTextIcon> Bình luận
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Bình luận</DialogTitle>
                </DialogHeader>
                <div className="flex gap-3 border-b pb-4 border-main-blue-s3">
                  <Input placeholder="Bình luận của bạn..."></Input>
                  <Button size={"icon"} variant={"ghost"}>
                    <SendHorizonalIcon></SendHorizonalIcon>
                  </Button>
                </div>
                <ScrollArea className="max-h-[400px] min-h-[200px]">
                  <div className="flex flex-col gap-4 pr-3">
                    <div className="font-medium text-sm flex gap-2">
                      <Avatar>
                        <AvatarImage />
                        <AvatarFallback>NC</AvatarFallback>
                      </Avatar>
                      <div className="mt-1">
                        <span className="">Ông nào đó</span>
                        <span className="text-xs text-slate-600 ml-2">
                          10 phút trước
                        </span>
                        <p className="bg-slate-100 mt-2 p-2 rounded-lg text-sm border border-main-blue-t8 w-fit">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Eius, earum!
                        </p>
                      </div>
                    </div>
                    <div className="font-medium text-sm flex gap-2">
                      <Avatar>
                        <AvatarImage />
                        <AvatarFallback>NC</AvatarFallback>
                      </Avatar>
                      <div className="mt-1">
                        <div>
                          <span className="">Ông nào đó</span>
                          <span className="text-xs text-slate-600 ml-2">
                            10 phút trước
                          </span>
                        </div>
                        <p className="bg-slate-100 mt-2 p-2 rounded-lg text-sm border border-main-blue-t8 w-fit">
                          Lorem ipsum dolor sit amet,
                        </p>
                      </div>
                    </div>
                    <div className="font-medium text-sm flex gap-2">
                      <Avatar>
                        <AvatarImage />
                        <AvatarFallback>NC</AvatarFallback>
                      </Avatar>
                      <div className="mt-1">
                        <span className="">Ông nào đó</span>
                        <span className="text-xs text-slate-600 ml-2">
                          10 phút trước
                        </span>
                        <p className="bg-slate-100 mt-2 p-2 rounded-lg text-sm border border-main-blue-t8 w-fit">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit
                        </p>
                      </div>
                    </div>
                    <div className="font-medium text-sm flex gap-2">
                      <Avatar>
                        <AvatarImage />
                        <AvatarFallback>NC</AvatarFallback>
                      </Avatar>
                      <div className="mt-1">
                        <span className="">Ông nào đó</span>
                        <span className="text-xs text-slate-600 ml-2">
                          10 phút trước
                        </span>
                        <p className="bg-slate-100 mt-2 p-2 rounded-lg text-sm border border-main-blue-t8 w-fit">
                          Lorem ipsum dolor
                        </p>
                      </div>
                    </div>
                    <div className="font-medium text-sm flex gap-2">
                      <Avatar>
                        <AvatarImage />
                        <AvatarFallback>NC</AvatarFallback>
                      </Avatar>
                      <div className="mt-1">
                        <span className="">Ông nào đó</span>
                        <span className="text-xs text-slate-600 ml-2">
                          10 phút trước
                        </span>
                        <p className="bg-slate-100 mt-2 p-2 rounded-lg text-sm border border-main-blue-t8 w-fit">
                          Lorem
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
          <Button variant={"outline"} size={"sm"}>
            Xem phòng<HouseIcon size={20} className="ml-3"></HouseIcon>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
