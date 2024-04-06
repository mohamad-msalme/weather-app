declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DATABASE_URL: string;
      WAETHER_STACK_BASE_URL: string;
      WEATHER_STACK_KEY: string;
      GEO_COODING_KEY: string;
      GEO_CODING_BASE_URL: string;
      PORT: string;
    }
  }
}

export {};
