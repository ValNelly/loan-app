import httpClient from "../../../lib/httpService";

export const login = (data: any) => httpClient.post("users/login/", data);
export const getUser = () => httpClient.get("users/");
export const register = (data: any) => httpClient.post("users/register/", data);
export const viewProfile = (token: string) =>
  httpClient.get(
    "users/profile/",
    {},
    { headers: { "x-access-token": token } }
  );
export const updateProfile = (data: any) =>
  httpClient.put("users/profile/", data);
// export const register = (data: any) => httpClient.post("users/register/", data);
