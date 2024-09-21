import { useAppDispatch } from "@/stores/hooks";
import { openAuthModal, switchFormType } from "@/stores/slices/authSlice";
import { Button } from "../ui/button";

const LoginButton = ({className, ...props}: {className?:string}) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        dispatch(openAuthModal())
        dispatch(switchFormType("login"));
      }}
      className={className}
      {...props}
    >
      Login
    </Button>
  );
};

export default LoginButton;
