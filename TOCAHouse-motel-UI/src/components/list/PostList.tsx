import { Label } from "@radix-ui/react-label";
import H3 from "../common/H3";
import Post from "./Post";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { HouseIcon, ImageIcon, PenToolIcon } from "lucide-react";
import SelectBox from "../common/SelectBox";
import { Input } from "../ui/input";
import ImageSlider from "../common/ImageSlider";
import { ChangeEvent, useState } from "react";

const PostList = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    setImages(event.target.files);
  };
  return (
    <div className="container flex mt-3 items-start justify-center gap-3">
      <div
        className={`rounded-xl border bg-background lg:w-1/4 lg-w-1/4 sticky top-[140px]  py-4 px-6`}
      >
        <H3 className="mb-6">Bài đăng tìm trọ</H3>
        <div>
          <Label>Loại bài đăng</Label>
          <div className="ml-3 mt-2 flex flex-col gap-2">
            <div>
              <Checkbox /> <Label>Tìm trọ</Label>
            </div>
            <div>
              <Checkbox /> <Label>Pass trọ</Label>
            </div>
            <div>
              <Checkbox /> <Label>Tìm người ở ghép</Label>
            </div>
            <div>
              <Checkbox /> <Label>Review trọ</Label>
            </div>
          </div>
          <Button size={"sm"} className="w-full mt-4" variant={"secondary"}>
            Lọc
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-4">
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
        </div>
      </div>
      <div
        className={`rounded-xl border bg-background lg:w-1/4 sticky top-[140px] py-4 px-6`}
      >
        <H3>Tạo bài viết</H3>
        <div className="mt-4">
          <div className="flex items-start">
            <Label className="text-sm text-slate-600">Bạn muốn đăng bài</Label>
            <SelectBox
              options={[
                { value: "FIND_ROOM", label: "Tìm trọ" },
                { value: "PASS_ROOM", label: "Pass trọ" },
                { value: "REVIEW", label: "Review" },
                { value: "FIND_ROOMMATE", label: "Tìm người ở ghép" },
              ]}
              onSelectChange={() => {}}
            ></SelectBox>
          </div>
          <div className="relative">
            <Textarea placeholder="Nội dung bài viết..." rows={7}></Textarea>
            <Button
              size={"sm"}
              variant={"ghost"}
              className="absolute bottom-1 right-1 text-xs text-main-yellow"
            >
              Tạo nội dung với AI
              <PenToolIcon size={16} className="ml-1"></PenToolIcon>
            </Button>
          </div>
          <Input
            id="post-image-input"
            type="file"
            className="size-0 invisible"
            onChange={handleChangeImage}
            multiple
          ></Input>
          <div>
            {images && (
              <ImageSlider
                height={200}
                images={Array.from(images).map((image: File) => ({
                  id: image.name,
                  url: URL.createObjectURL(image),
                }))}
              ></ImageSlider>
            )}
          </div>
          <div className="flex justify-end text-main-blue-s3 mt-3 items-center">
            <Button size={"icon"} variant={"ghost"}>
              <Label htmlFor="post-image-input">
                <ImageIcon></ImageIcon>
              </Label>
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <HouseIcon></HouseIcon>
            </Button>

            <Button size={"sm"} className="block ml-auto">
              Đăng bài
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
