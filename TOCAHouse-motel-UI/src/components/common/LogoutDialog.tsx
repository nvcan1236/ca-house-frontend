import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/stores/hooks";
import { logout } from "@/stores/slices/authSlice";

export function LogoutDialog() {
  const dispatch = useAppDispatch();
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full text-left">Đăng xuất</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Thông báo</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn đăng xuất?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction onClick={() => dispatch(logout())}>
            Đăng xuất
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
