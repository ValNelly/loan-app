import httpClient from "../../../lib/httpService";

export const getMyLoans = (token: string) =>
  httpClient.get("my-loans/", {}, { headers: { "x-access-token": token } });
export const RequestLoanMyLoans = (token: string, data: any) =>
  httpClient.post("my-loans/", data, { headers: { "x-access-token": token } });

export const getLoans = (token: string) => httpClient.get("loans/");
export const getFeeds = (token: string) => httpClient.get("feeds/");
