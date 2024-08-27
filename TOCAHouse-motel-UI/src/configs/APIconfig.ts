export const caHouseBaseUrl = "http://localhost:8888/api";

type MotelInfor = "amenity" | "location" | "price" | "requirement" | "images";

export const caHouseEndpoint = {
  // User
  getToken: `${caHouseBaseUrl}/identity/auth/token`,
  getMyInfor: `${caHouseBaseUrl}/identity/users/my-infor`,
  logout: `${caHouseBaseUrl}/identity/auth/logout`,
  outbound: `${caHouseBaseUrl}/identity/auth/outbound/authentication`,
  createPassword: `${caHouseBaseUrl}/identity/auth/create-password`,
  uploadAvatar:  `${caHouseBaseUrl}/identity/users/upload-avatar`,
  getUserById: (userId: string) => `${caHouseBaseUrl}/identity/users/${userId}`,
  register: `${caHouseBaseUrl}/identity/users`,
  // Motel
  createMotel: `${caHouseBaseUrl}/motel/`,
  getAllMotel: `${caHouseBaseUrl}/motel/`,
  getDetailMotel: (motelId: string) => `${caHouseBaseUrl}/motel/${motelId}`,
  updateMotel: (motelId: string) => `${caHouseBaseUrl}/motel/${motelId}`,
  addMotelInfo: (motelId: string, type: MotelInfor) =>
    `${caHouseBaseUrl}/motel/${motelId}/${type}`,
  updateOrDeleteMotelInfo: (type: MotelInfor, inforId: string) =>
    `${caHouseBaseUrl}/motel/${type}/${inforId}`,

};

const GEO_API_KEY = "66cda0de0c6d0580720717ocb2d7496"

export const geoMapEndpoint = (address:string) => `https://geocode.maps.co/search?q=${address}&api_key=${GEO_API_KEY}` 

export const provinceVNEndpoint = `https://provinces.open-api.vn/api/`