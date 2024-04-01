import httpClient from "../../../lib/httpService";

export const getMyLoans = (token: string) =>
  httpClient.get("my-loans/", {}, { headers: { "x-access-token": token } });
export const requestLoan = (token: string, data: any) =>
  httpClient.post("request-loan/", data, {
    headers: { "x-access-token": token },
  });

export const getLoans = () => httpClient.get("loans/");
export const getFeeds = () => httpClient.get("feeds/");
