import { Image } from "./types";

export interface IMotel {
  id: string;
  name: string;
  area: number;
  price: number;
  type: string;
  availableDate: string;
  status: string;
  createdAt: string;
  images: Image[]
}

export interface IMotelDetail extends IMotel {
  
}