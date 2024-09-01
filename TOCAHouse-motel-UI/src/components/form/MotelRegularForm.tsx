import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { caHouseEndpoint } from "@/configs/APIconfig";
import axios from "@/services/axios";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import DatePicker from "./DatePicker";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/stores/hooks";
import { nextStep, prevStep, setData } from "@/stores/slices/createMotelSlice";
import { motelTypes } from "@/utils/predefinedData";

const MotelRegularForm = () => {
  const dispatch = useAppDispatch();

  const loginValidationSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    price: z.string(),
    type: z.string(),
    area: z.string(),
    availableDate: z.date(),
  });

  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: "0",
      type: "",
      area: "0",
      availableDate: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginValidationSchema>) {
    dispatch(setData({ type: "id", data: "123" }));
    dispatch(nextStep());

    // axios
    //   .post(caHouseEndpoint.createMotel, JSON.stringify(values))
    //   .then((data) => {
    //     console.log(data.data)
    //     // dispatch(setData("id", data.data.result.id))
    //     dispatch(nextStep());
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.message);
    //   });

    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-4 flex flex-col"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đặt tên cho căn trọ</FormLabel>
                <FormDescription>
                  Tên phòng giúp mọi người dễ nhớ đến phòng của bạn hơn
                </FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thêm mô tả</FormLabel>
                <FormDescription>
                  Mô tả kỹ hơn về căn trọ của bạn, về những thứ bạn ấn tượng
                </FormDescription>
                <FormControl>
                  <Textarea {...field} placeholder="Mô tả..."></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bạn sẽ cho thuê với giá bao nhiêu 1 tháng</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại phòng</FormLabel>
                <FormControl>
                  <RadioGroup
                    // defaultValue="option-one"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {motelTypes?.map((type) => (
                        <div className="h-full">
                          <RadioGroupItem
                            value={type.value}
                            id={type.label}
                            className="invisible size-0 hidden"
                          />
                          <Label htmlFor={type.label}>
                            <div
                              className={`border size-full rounded-lg border-2 p-4 text-center ${
                                form.getValues("type") === type.value &&
                                "border-main-blue-s3 "
                              } `}
                            >
                              <div className="w-fit mx-auto py-1">
                                {type.icon}
                              </div>
                              <p className="text-xs text-center mt-2 line-clamp-2">
                                {type.label}
                              </p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diện tích</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Đơn vị (m2)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableDate"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel>Ngày phòng trống</FormLabel>
                </div>
                <DatePicker field={field}></DatePicker>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" flex justify-end gap-2 fixed bottom-0 left-0 right-0 bg-background px-10 py-4 border-t ">
            <Button
              size={"lg"}
              variant={"secondary"}
              onClick={() => dispatch(prevStep())}
            >
              Quay lại
            </Button>
            <Button
              // disabled={!form.formState.isValid}
              size={"lg"}
              onClick={() => {
                dispatch(setData({ type: "regular", data: form.getValues() }));
              }}
            >
              Tiếp tục
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MotelRegularForm;
