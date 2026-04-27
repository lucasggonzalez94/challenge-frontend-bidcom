import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://dummyjson.com/health", () => {
    return HttpResponse.json({ status: "ok" });
  }),
];
