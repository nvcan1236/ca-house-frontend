import { ReactNode } from "react";

export type language = "vi" | "en";
export type role = "motel" | "post";

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
  avatar: string;
  noPassword: boolean;
};

export type UserRole = "USER" | "OWNER" | "ADMIN";

export type Permission = {
  name: string;
  description: string;
};

export type Profile = {
  dob: string;
  phone: string;
  messgenger: string;
  occupation: string;
};

export type DetailUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  roles: UserRole[];
  profile: Profile | null;
};

export type Image = {
  id: string;
  url: string;
};

export type MotelType = {
  label: string;
  icon: ReactNode;
  value: string;
};

export type Location = {
  province: string;
  district: string;
  ward: string;
  street: string;
  other: string;
  longitude: number | null;
  latitude: number | null;
};

export type Amenity = { name: string; type: string };

export type Price = {
  type: PredefinePrice;
  name: string | null;
  value: number | null;
  unit: string;
  units: string[];
};

export type Requirement = {
  deposit: number;
  contractAmount: number;
  allowPet: boolean;
  jobs: Job[];
  other: string | null;
};

export type PredefinePrice =
  | "ELECTRICITY"
  | "WATER"
  | "INTERNET"
  | "PARKING"
  | "SERVICE"
  | "ORTHER";

export type MotelStatus = {
  label: string;
  value: "RENTING" | "AVAILABLE";
};

export type Job = "STUDENT" | "WORKER" | "OFFICER" | "FREELANCER" | "OTHER";

export type Reaction = {
  type: "LIKE" | "SAD" | "HAPPY" | "ANGRY";
  icon: ReactNode;
};

export type ApiResponse<T> = {
  code: number;
  result: T;
  message: string;
};

export interface PageResult<T> {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalElement: number;
  data: T[];
}

export type LoginForm = {
  username: string;
  password: string;
};

export type TokenData = {
  authenticated: boolean;
  token: string;
};

export type CreatePasswordData = { password: string; rePassword: string };
