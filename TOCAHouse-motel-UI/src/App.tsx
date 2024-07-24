import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/layout/MainLayout";
import { useEffect } from "react";
import { useAppSelector } from "./stores/hooks";
import { useTranslation } from "react-i18next";
import DetailMotel from "./pages/DetailMotel";
import PageNotFound from "./pages/PageNotFound";
import AuthModal from "./components/auth/AuthModal";

function App() {
  const language = useAppSelector((state) => state.common.language);

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="motels/:motelId" element={<DetailMotel />}></Route>
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <AuthModal></AuthModal>
    </BrowserRouter>
  );
}

export default App;
