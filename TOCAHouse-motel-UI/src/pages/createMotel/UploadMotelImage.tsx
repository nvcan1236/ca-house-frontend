import DecorativeHeading from "@/components/common/DecorativeHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/stores/hooks";
import { nextStep, prevStep } from "@/stores/slices/createMotelSlice";
import { UploadIcon } from "lucide-react";
import { useState } from "react";

const UploadMotelImage = () => {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileList | null>();
  return (
    <div className="">
      <div className="flex flex-col gap-10">
        <div className="lg:w-[800px] w-full mx-auto ">
          <DecorativeHeading className="!text-2xl text-main-blue-s3">
            Thêm hình ảnh cho căn trọ
          </DecorativeHeading>

          <label
            htmlFor="motel-image-input"
            className=" block mt-10 min-h-[400px]  border-2 border-main-blue-s3 p-2 rounded-lg border-dashed"
          >
            <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-2">
              {files &&
                Array.from(files).map((file) => (
                  <img src={URL.createObjectURL(file)} className="" />
                ))}
            </div>
          </label>
          <Input
            id="motel-image-input"
            type="file"
            className="invisible size-0"
            onChange={(e) => setFiles(e.target.files)}
            multiple
          ></Input>
        </div>

        <div className=" flex justify-end gap-2 fixed bottom-0 left-0 right-0 bg-background px-10 py-4 border-t ">
          <Button variant={"outline"} type="button" asChild>
            <label htmlFor="motel-image-input" className="block">
              <UploadIcon></UploadIcon> Chọn ảnh
            </label>
          </Button>
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
              // console.log(files)
              dispatch(nextStep());
            }}
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadMotelImage;
