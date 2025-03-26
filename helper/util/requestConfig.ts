export const getHeaders = () => {
  const user = process.env.USER_NAME;
  const pass = process.env.PASSWORD;
  const authRaw = `${user}:${pass}`;
  const authBase64 = Buffer.from(authRaw).toString("base64");

  return {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Basic ${authBase64}`
  };
};
