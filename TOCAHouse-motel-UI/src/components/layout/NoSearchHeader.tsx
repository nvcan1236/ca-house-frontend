import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { language } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useNavigate } from "react-router-dom";
import {
  openAuthModal,
  switchFormType,
} from "@/stores/slices/authSlice";
import UserMenuPopover from "../common/UserMenuPopover";
import { LanguagesIcon } from "lucide-react";

const NoSearchHeader = () => {
  const { i18n } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const changeLanguage = (value: language) => {
    console.log(value);
    i18n.changeLanguage(value);
  };
  return (
    <header className="container">
      <div
        className={`md:px-10 flex items-center justify-between py-4 gap-x-4 transition-all}`}
      >
        <div className="w-[200px] cursor-pointer" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="logo" className="object-cover w-20 h-20" />
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="flex gap-4 items-center">
            <Select onValueChange={changeLanguage}>
              <SelectTrigger className="w-[100px] text-sm">
                <LanguagesIcon className="size-4 " />
                {`(${i18n.language.toUpperCase()}) `}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="vi">Vietnamese</SelectItem>
              </SelectContent>
            </Select>

            <div>
              {user && Object.keys(user).length > 0 ? (
                <UserMenuPopover user={user}/>
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(openAuthModal());
                    dispatch(switchFormType("login"));
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NoSearchHeader;
