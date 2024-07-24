import Modal from "../modal/Modal";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { closeAuthModal } from "@/stores/slices/authSlice";
import CloseIcon from "../icon/CloseIcon";
import LoginForm from "../form/LoginForm";
import RegisterForm from "../form/RegisterForm";

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const formType = useAppSelector((state) => state.auth.formType);

  return (
    <Modal>
      <div className="w-[500px] bg-background rounded-xl relative">
        <div className="p-10">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="absolute right-4 top-4 "
            onClick={() => dispatch(closeAuthModal())}
          >
            <CloseIcon></CloseIcon>
          </Button>
          <div onClick={(e) => e.stopPropagation()}>
            {formType === "login" && <LoginForm></LoginForm>}
            {formType === "register" && <RegisterForm></RegisterForm>}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
