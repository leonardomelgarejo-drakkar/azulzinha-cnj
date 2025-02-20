export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: "dev" | "test";
      BASEURL: string;
      RESOURCE_PATH_DEPOSITO_JUDICIAL: string;
    }
  }
}
