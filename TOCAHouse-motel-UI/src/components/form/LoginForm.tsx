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
import { useEffect, useState } from "react";
import EyeClose from "../icon/EyeClose";
import EyeOpen from "../icon/EyeOpen";
import { Separator } from "../ui/separator";
import { useAppDispatch } from "@/stores/hooks";
import {
  closeAuthModal,
  setUserInfor,
  switchFormType,
} from "@/stores/slices/authSlice";
import { getToken, setToken } from "@/services/localStorageService";
import { caHouseEndpoint } from "@/configs/APIconfig";
import axios from "@/services/axios";
import googleConfig from "@/configs/googleLoginConfig";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const loginValidationSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(8),
  });

  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginWithGoogle = () => {
    const callbackUri = googleConfig.redirect_uris;
    const client_id = googleConfig.client_id;
    const authUrli = googleConfig.auth_uri;

    const targetUrl = `${authUrli}?client_id=${client_id}&redirect_uri=${encodeURIComponent(
      callbackUri
    )}&response_type=code&scope=openid%20email%20profile&`;

    window.location.href = targetUrl;
  };

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

      axios
        .post(caHouseEndpoint.outbound, null, {
          params: {
            code: authCode,
          },
        })
        .then((data) => {
          console.log(data)
          setToken(data.data.result.token);
          axios
            .get(caHouseEndpoint.getMyInfor, {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            })
            .then((data) => {
              dispatch(setUserInfor(data.data.result));
            });
        });
    }
  }, []);

  function onSubmit(values: z.infer<typeof loginValidationSchema>) {
    axios
      .post(caHouseEndpoint.getToken, JSON.stringify(values))
      .then((data) => {
        if (data.status === 200) {
          form.reset();
          dispatch(closeAuthModal());
          setToken(data.data.result.token);
          axios
            .get(caHouseEndpoint.getMyInfor, {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            })
            .then((data) => {
              dispatch(setUserInfor(data.data.result));
            });
        }
      });
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
                <FormLabel>Username/ Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username or email"
                    {...field}
                  />
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

          <Button type="submit" className="mt-6 w-full">
            Submit
          </Button>
          <Button
            type="button"
            className="mt-2 w-full"
            variant={"outline"}
            onClick={loginWithGoogle}
          >
            <img
              src="/google-icon.png"
              alt="Google Icon"
              className="size-5 mr-4"
            />{" "}
            Login with Google
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
