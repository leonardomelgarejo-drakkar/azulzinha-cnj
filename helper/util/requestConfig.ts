import * as data from "./test-data/registerUser.json";

export const getHeaders = () => ({
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Basic ${Buffer.from(`${data.userName}:${data.password}`).toString("base64")}`
});