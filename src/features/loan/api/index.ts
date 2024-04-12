import httpClient from "../../../lib/httpService";

export const getMyLoans = (token: string) =>
  httpClient.get("my-loans/", {}, { headers: { "x-access-token": token } });
export const requestLoan = (token: string, data: any) =>
  httpClient.post("request-loan/", data, {
    headers: { "x-access-token": token },
  });

export const getLoans = () => httpClient.get("loans/");
export const getLoanRequests = () => httpClient.get("loan-requests/");
export const getFeeds = () => httpClient.get("feeds/");
export const addFeed = (data: any) => httpClient.post("feeds/", data);
export const updateFeed = (id: string, data: any) =>
  httpClient.put(`feeds/${id}/`, data);
export const addLoan = (data: any) => httpClient.post("loans/", data);
export const updateLoan = (id: string, data: any) =>
  httpClient.put(`loans/${id}/`, data);
