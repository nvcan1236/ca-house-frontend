import { postType, reactions } from "./predefinedData";
import {
  Amenity,
  Image,
  Location,
  Price,
  Requirement,
  UserRole,
} from "./types";

export interface IMotel {
  id: string;
  name: string;
  area: number;
  price: number;
  type: string;
  availableDate: string;
  status: string;
  createdAt: string;
  images: Image[];
  longitude: number;
  latitude: number;
  district: string;
  city: string;
  approved: boolean;
}

export interface IMotelDetail extends IMotel {
  description: string;
  ownerId: string;
  amenities: Amenity[];
  requirement: Requirement;
  prices: Omit<Price, "units">[];
  images: Image[];
  location: Location;
}

export interface Step {
  component: React.ReactNode;
  href: string;
  nextStepHref: string | null;
}

export interface Steps {
  regular: Step;
  location: Step;
  amenities: Step;
  images: Step;
  prices: Step;
  requirements: Step;
}

export interface RegularCreate {
  name: string;
  description: string;
  price: number;
  type: string;
  area: number;
  availableDate: string;
}

// Kiểu dữ liệu cho Ward (Phường/Xã)
export interface Ward {
  name: string;
}

// Kiểu dữ liệu cho District (Quận/Huyện)
export interface District {
  name: string;
  wards: Ward[]; // Mảng các phường/xã thuộc quận/huyện này
}

// Kiểu dữ liệu cho Province (Tỉnh/Thành phố)
export interface Province {
  name: string;
  districts: District[]; // Mảng các quận/huyện thuộc tỉnh/thành phố này
}

export interface IPost {
  content: string;
  id: string;
  type: keyof typeof postType;
  create_by: string;
  images: Image[];
  comment_count: number;
  react_count: number;
  liked: keyof typeof reactions | null;
  create_at: string;
}

export interface IComment {
  id: string;
  create_at: string;
  post_id: string;
  user_id: string;
  content: string;
  reply_to: unknown;
}

export interface ICommentCreate {
  content: string;
}

export interface IPostCreate {
  content: string;
  type: keyof typeof postType;
}

// Chat Interface
export interface ChatUser {
  id: string;
  avatar: string;
  displayName: string;
  role: UserRole[];
}

export interface ChatRoom {
  id: string;
  member: string[];
  createdAt: CreatedAt;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  createdBy: string;
  type: "text" | "image";
  createdAt: CreatedAt;
  content: string[];
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface CreateMessage {
  content?: string;
  type: "TEXT" | "IMAGE";
  recipient: string;
  images?: FileList|[];
}
