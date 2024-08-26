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
  images: Image[];
  longitude: number;
  latitude: number;
  district: string;
  city: string;
}

export interface IMotelDetail extends IMotel {
  description: string;
  ownerId: string;
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