import { HouseIcon, MessageSquareTextIcon } from "lucide-react";
import H3 from "../common/H3";
import ImageSlider from "../common/ImageSlider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useState } from "react";
import { postType, reactions } from "@/utils/predefinedData";
import { IPost } from "@/utils/interfaces";
import CommentDialog from "./CommentDialog";
import { useReactMutation } from "@/stores/api/postApi";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/helper";
import { useAppSelector } from "@/stores/hooks";
import { toast } from "sonner";
import { useFollowMutation } from "@/stores/api/userApi";

const Post = ({ data }: { data: IPost }) => {
  const [currentReact, setCurrentReact] = useState<
    keyof typeof reactions | null
  >(data.liked);
  const [reactPost] = useReactMutation();
  const user = useAppSelector((state) => state.auth.user);
  const [follow] = useFollowMutation();

  const react = (postId: string, type: keyof typeof reactions | null) => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập trước.");
      return;
    }
    reactPost({ postId, type });
    setCurrentReact(type);
  };

  const followUser = (userId: string) => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập trước.");
      return;
    }
    follow(userId);
  };

  return (
    <div className="bg-background border rounded-xl p-6 pb-4">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex">
            <Avatar>
              <AvatarImage src="https://plus.unsplash.com/premium_photo-1661780440075-75263eb76824?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9zdHxlbnwwfHwwfHx8MA%3D%3D" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <div className="flex gap-2 items-center">
                <H3 className="!text-base cursor-pointer max-w-[120px] overflow-hidden text-ellipsis">
                  {data.create_by}
                </H3>
                <Button
                  size={"sm"}
                  variant={"secondary"}
                  className="text-xs h-auto px-2 py-1"
                  onClick={() => followUser(data.create_by)}
                >
                  Theo dõi
                </Button>
              </div>
              <span className="text-sm font-medium text-main-yellow">
                Chủ trọ
              </span>
            </div>
          </div>
          <div className="justify-self-end text-end">
            <p className="text-slate-600 text-sm ">
              Đăng vào {formatDate(data.create_at)}
            </p>
            <span className="font-semibold inline-block mt-px">
              {postType[data.type]}
            </span>
          </div>
        </div>
        <div>
          <p className="">{data.content}</p>
          {data.images.length > 0 && (
            <div className="mt-2 h-[300px]">
              <ImageSlider height={300} images={data.images}></ImageSlider>
            </div>
          )}
        </div>
        <div className="pt-3 border-t flex flex-1 text-sm">
          <div className="flex gap-2 items-center flex-1">
            <HoverCard>
              <HoverCardTrigger
                className="pl-3 flex gap-2"
                onClick={() => react(data.id, currentReact ? null : "LIKE")}
              >
                {currentReact ? (
                  <span className="text-main-yellow">
                    {reactions[currentReact].icon}
                  </span>
                ) : (
                  <span className="text-slate-600">{reactions.LIKE.icon}</span>
                )}
              </HoverCardTrigger>
              {data.react_count} cảm xúc
              <HoverCardContent
                side="top"
                align="start"
                sideOffset={8}
                className="w-fit p-2"
              >
                {Object.keys(reactions).map((type) => (
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    key={type}
                    onClick={() =>
                      react(data.id, type as keyof typeof reactions)
                    }
                  >
                    {reactions[type as keyof typeof reactions].icon}
                  </Button>
                ))}
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex items-center flex-1">
            <CommentDialog postId={data.id}>
              <MessageSquareTextIcon></MessageSquareTextIcon>
              {data.comment_count} Bình luận
            </CommentDialog>
          </div>
          <Button variant={"outline"} size={"sm"} className="">
            <Link to={`/motels/123`} className="flex justify-center gap-3">
              <span className="hidden sm:inline">Xem phòng</span>
              <HouseIcon size={20}></HouseIcon>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
