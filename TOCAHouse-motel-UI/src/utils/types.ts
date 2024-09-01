import { ReactNode } from "react";

type language = "vi" | "en";
type role = "motel" | "post";

export type { language, role };

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: object[];
  avatar: string;
  noPassword: boolean;
};

export type UserRole = {
  name: string;
  description: string;
  permissions: Permission[];
};

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

export type Price = {
  type: PredefinePrice;
  name: string | null;
  price: number | null;
  unit: string;
  units: string[];
};

export type PredefinePrice =
  | "ELECTRICITY"
  | "WATER"
  | "INTERNET"
  | "PARKING"
  | "SERVICE"
  | "ORTHER";

export type MotelStatus = {
  label: string,
  value: "RENTING"|"AVAILABLE"
}

export type Job = "STUDENT" | "WORKER" | "OFFICER" | "FREELANCER" | "OTHER";