import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/layout/MainLayout";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./stores/hooks";
import { useTranslation } from "react-i18next";
import DetailMotel from "./pages/DetailMotel";
import PageNotFound from "./pages/PageNotFound";
import AuthModal from "./components/auth/AuthModal";
import Profile from "./pages/Profile";
import NoSearchLayout from "./components/layout/NoSearchLayout";
import CreateMotel from "./pages/createMotel/CreateMotel";
import MotelManage from "./pages/MotelManage";
import DetailMotelManage from "./pages/DetailMotelManage";
import { useGetCurrentUserQuery } from "./stores/api/userApi";
import { setUserInfor } from "./stores/slices/authSlice";
import { setToken } from "./services/localStorageService";

function App() {
  const language = useAppSelector((state) => state.common.language);
  const { i18n } = useTranslation();
  const { data, isError } = useGetCurrentUserQuery();
  isError && setToken(null)
  const dispatch = useAppDispatch();
  data?.code === 1000 && dispatch(setUserInfor(data.result));
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

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
          <Route
            path="/my-motel/:motelId"
            element={<DetailMotelManage />}
          ></Route>
        </Route>

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
