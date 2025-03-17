export const getHeaders = () => ({
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Basic ${Buffer.from(`${process.env.USER_NAME}:${process.env.PASSWORD}`).toString("base64")}`
});