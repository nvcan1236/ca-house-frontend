export const caHouseBaseUrl = "http://localhost:8888/api";


export const caHouseEndpoint = {
  getToken: `${caHouseBaseUrl}/identity/auth/token`,
  getMyInfor: `${caHouseBaseUrl}/identity/users/my-infor`,
  logout: `${caHouseBaseUrl}/identity/auth/logout`,
  outbound: `${caHouseBaseUrl}/identity/auth/outbound/authentication`,
  createPassword: `${caHouseBaseUrl}/identity/auth/create-password`,
  getUserById: (userId:string) => `${caHouseBaseUrl}/identity/users/${userId}`,
};
