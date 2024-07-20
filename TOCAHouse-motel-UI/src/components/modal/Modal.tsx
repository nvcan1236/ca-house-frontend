import useClickOutSide from "../../hooks/useClickOutSide";
import { ReactNode, useRef } from "react";
import { useAppDispatch } from "@/stores/hooks";
import { closeAuthModal } from "@/stores/slices/authSlice";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  show: boolean;
}

const Modal = ({ children, onClose, show }: ModalProps) => {
  const dispatch = useAppDispatch();
  const handleCloseModel = () => {
    dispatch(closeAuthModal());
    onClose && onClose();
  };

  const modalRef = useClickOutSide<HTMLDivElement>(handleCloseModel);
  const nodeRef = useRef(null);

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      timeout={250}
      classNames={"modal"}
      unmountOnExit
    >
      <div
        className="bg-black bg-opacity-35 fixed inset-0 z-20 flex items-center justify-center transition-all duration-300"
        ref={nodeRef}
      >
        <div className="w-[500px] content transition-all duration-300" ref={modalRef}>
          {children}
          <p className="text-red-500">{show ? "show" : "not show"}</p>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default Modal;
