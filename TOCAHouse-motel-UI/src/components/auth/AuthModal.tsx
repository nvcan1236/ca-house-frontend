import useScrollLock from "@/hooks/useScrollLock";
import Modal from "../modal/Modal";
import LoginForm from "../form/LoginForm";

const AuthModal = ({ show }: { show: boolean }) => {
  useScrollLock();

  return (
    <Modal show={show}>
      <div className="w-[500px] bg-background rounded-xl">
        <div className="p-10">
          <LoginForm></LoginForm>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
