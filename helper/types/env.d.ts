export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: "dev";
      BASEURL: string;
      RESOURCE_PATH_DEPOSITO_JUDICIAL: string;
      USER_NAME: string;
      PASSWORD: string;
    }
  }
}
