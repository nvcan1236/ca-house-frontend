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
import { Separator } from "../ui/separator";
import { useState } from "react";
import { closeAuthModal, switchFormType } from "@/stores/slices/authSlice";
import { useAppDispatch } from "@/stores/hooks";
import axios from "@/services/axios";
import { caHouseEndpoint } from "@/configs/APIconfig";
import { error } from "console";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loginValidationSchema = z
    .object({
      username: z.string().min(4),
      password: z.string().min(8),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      rePassword: z.string().min(8),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Mật khẩu không trùng khớp",
      path: ["rePassword"],
    });
  const [step, setStep] = useState<number>(1);

  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      rePassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginValidationSchema>) {
    const data = { ...values };
    data.roles = ["USER"];
    axios
      .post(caHouseEndpoint.register, JSON.stringify(data))
      .then((data) => {
        form.reset();
        dispatch(closeAuthModal());
        console.log(data.data.result);
      })
      .catch((error) => toast.error(error.response.data.message));
  }
  return (
    <div>
      <Form {...form}>
        <h3 className="text-slate-500 font-semibold text-2xl text-center ">
          Tạo tài khoản
        </h3>
        <Separator className="mt-3 mb-5 bg-main-yellow" />
        <form onSubmit={form.handleSubmit(onSubmit)} className={``}>
          <div className={`gap-4 flex flex-col ${step === 1 ? "" : "hidden"}`}>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              className="mt-6 w-full"
              onClick={() => setStep(2)}
            >
              Tiếp tục
            </Button>
          </div>

          <div className={`gap-4 flex flex-col ${step === 2 ? "" : "hidden"}`}>
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
                        className="absolute right-3 top-1/2 p-1 -translate-y-1/2 "
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
                      </span>
                    </div>
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
                  <FormLabel>Password again</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password again"
                        className="pr-10"
                        {...field}
                      />
                      <span
                        className="absolute right-3 top-1/2 p-1 -translate-y-1/2 "
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-6 flex gap-3">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setStep(1)}
              >
                Quay lại
              </Button>
              <Button type="submit" className="flex-1">
                Submit
              </Button>
            </div>
          </div>

          <p className="mt-2">
            Đã có tài khoản ?{" "}
            <Button
              className="text-main-blue"
              variant={"link"}
              type="button"
              onClick={() => dispatch(switchFormType())}
            >
              Đăng nhập
            </Button>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
