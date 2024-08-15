import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import axios from "@/services/axios";
import { caHouseEndpoint } from "@/configs/APIconfig";
import { getToken } from "@/services/localStorageService";
import { Button } from "../ui/button";

const CreatePasswordForm = () => {
  const loginValidationSchema = z.object({
    password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự."),
    rePassword: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự."),
  }).refine((data) => data.password === data.rePassword, {
    message: "Mật khẩu không trùng khớp",
    path: ["rePassword"],
  });

  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      password: "",
      rePassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginValidationSchema>) {
    axios
      .post(caHouseEndpoint.createPassword, JSON.stringify(values), {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((data) => {
        console.log(data.data.message);
      });
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập mật khẩu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập lại mật khẩu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4 self-end px-14">Tạo</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePasswordForm;
