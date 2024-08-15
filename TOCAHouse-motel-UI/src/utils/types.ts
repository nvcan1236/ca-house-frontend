type language = "vi" | "en";
type role = "for_rent" | "for_lease";

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
  dob: string
  phone: string
  messgenger: string
  occupation: string
}

export type DetailUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  roles: UserRole[];
  profile: Profile|null;
};
