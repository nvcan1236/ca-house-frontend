import { useTranslation } from "react-i18next";
import { Button } from "./components/ui/button";
import { useAppSelector, useAppDispatch } from "./stores/hooks";
import { switchLanguage, switchRole } from "./stores/slices/commonSlice";

function App() {
  const { t, i18n } = useTranslation();
  const language = useAppSelector((state) => state.common.language);
  const role = useAppSelector((state) => state.common.role);
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className={`text-center from-25% via-white  bg-gradient-to-br transition-all ${
          role === "for_rent"
            ? "from-[#fef6ec]  to-[#d7e1ed] "
            : " from-[#d7e1ed]  to-[#fef6ec] "
        }`}
      >
        <p>{t("common.button.search")}</p>
        <Button
          variant={"outline"}
          onClick={() => {
            dispatch(switchLanguage(language === "en" ? "vi" : "en"));
            dispatch(switchRole());
            i18n.changeLanguage(language);
          }}
        >
          Switch Language
        </Button>
      </div>
    </>
  );
}

export default App;
