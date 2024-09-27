import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/layout/MainLayout";
import { useAppDispatch } from "./stores/hooks";
import DetailMotel from "./pages/DetailMotel";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import NoSearchLayout from "./components/layout/NoSearchLayout";
import CreateMotel from "./pages/createMotel/CreateMotel";
import MotelManage from "./pages/MotelManage";
import DetailMotelManage from "./pages/DetailMotelManage";
import { useGetCurrentUserQuery } from "./stores/api/userApi";
import { setUserInfor } from "./stores/slices/authSlice";
import { setToken } from "./services/localStorageService";
import { lazy } from "react";

const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));
const ManageUsers = lazy(() => import("./pages/admin/users/ManageUsers"));
const ManageMotel = lazy(() => import("./pages/admin/motels/ManageMotel"));
const ManagePosts = lazy(() => import("./pages/admin/posts/ManagePosts"));
const StatUser = lazy(() => import("./pages/admin/users/StatUser"));
const StatMotel = lazy(() => import("./pages/admin/motels/StatMotel"));
const StatPost = lazy(() => import("./pages/admin/posts/StatPosts"));
const Home = lazy(() => import("./pages/admin/Home"));
const Approve = lazy(() => import("./pages/admin/Approve"));
import ManageMyPost from "./pages/ManageMyPost";
import SavedMotels from "./pages/SavedMotels";
import UserAppointmentList from "./pages/UserAppointmentList";
import PaymentStatus from "./pages/PaymentStatus";
import UserReservationList from "./pages/UserReservationtList";
import Index from "./pages/admin/Index";
import AuthModal from "./components/modal/AuthModal";

function App() {
  const { data, isError } = useGetCurrentUserQuery();
  isError && setToken(null);
  const dispatch = useAppDispatch();
  data?.code === 1000 && dispatch(setUserInfor(data.result));

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
        </Route>

        <Route element={<NoSearchLayout />}>
          <Route path="/motels/:motelId" element={<DetailMotel />}></Route>
          <Route path="/profile/:userId" element={<Profile />}></Route>
          <Route path="/register-motel" element={<CreateMotel />}></Route>
          <Route path="/my-motel" element={<MotelManage />}></Route>
          <Route path="/my-post" element={<ManageMyPost />}></Route>
          <Route path="/saved-motel" element={<SavedMotels />}></Route>
          <Route
            path="/my-motel/:motelId"
            element={<DetailMotelManage />}
          ></Route>
          <Route
            path="/my-appointments"
            element={<UserAppointmentList />}
          ></Route>
          <Route
            path="/my-reservations"
            element={<UserReservationList />}
          ></Route>
          <Route path="/payment-status" element={<PaymentStatus />}></Route>
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/home" element={<Home />}></Route>
          <Route path="/admin/approve" element={<Approve />}></Route>
          <Route path="/admin/motels" element={<ManageMotel />}></Route>
          <Route path="/admin/users" element={<ManageUsers />}></Route>
          <Route path="/admin/posts" element={<ManagePosts />}></Route>
          <Route path="/admin/stat/motels" element={<StatMotel />}></Route>
          <Route path="/admin/stat/users" element={<StatUser />}></Route>
          <Route path="/admin/stat/posts" element={<StatPost />}></Route>
        </Route>
        <Route path="/admin" element={<Index />}></Route>

        <Route
          path="*"
          element={<PageNotFound message="Trang không tồn tại" />}
        ></Route>
      </Routes>
      <AuthModal></AuthModal>
      
    </BrowserRouter>
  );
}

export default App;
