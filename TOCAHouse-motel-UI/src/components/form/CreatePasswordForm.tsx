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
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setUserInfor } from "@/stores/slices/authSlice";
import { useCreatePasswordMutation } from "@/stores/api/userApi";

const CreatePasswordForm = () => {
  const loginValidationSchema = z
    .object({
      password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự."),
      rePassword: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự."),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Mật khẩu không trùng khớp",
      path: ["rePassword"],
    });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [createPassword] = useCreatePasswordMutation();

  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      password: "",
      rePassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginValidationSchema>) {
    createPassword(values).then((response) => {
      toast.success(response.data?.message);
      if (user) {
        const nextDetailUser = { ...user, noPassword: true };
        dispatch(setUserInfor(nextDetailUser));
      }
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
