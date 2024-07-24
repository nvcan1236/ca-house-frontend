import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import EyeClose from "../icon/EyeClose";
import EyeOpen from "../icon/EyeOpen";
import { Separator } from "../ui/separator";
import { useAppDispatch } from "@/stores/hooks";
import { switchFormType } from "@/stores/slices/authSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loginValidationSchema = z.object({
    username: z.string().min(8),
    password: z.string().min(8),
  });
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginValidationSchema>) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <h3 className="text-slate-500 font-semibold text-2xl text-center ">
          Đăng nhập
        </h3>
        <Separator className="mt-3 mb-5 bg-main-yellow" />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-4 flex flex-col"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pr-10"
                      {...field}
                    />
                    <span
                      className="absolute right-3 top-1/2 p-1 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOpen /> : <EyeClose />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button type="submit" className="mt-6 w-full">
            Submit
          </Button>
          <p>
            Chưa có tài khoản ?{" "}
            <Button
              className="text-main-blue"
              variant={"link"}
              type="button"
              onClick={() => dispatch(switchFormType())}
            >
              Đăng ký
            </Button>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
