import "dotenv/config";
import * as env from "env-var";

export const evns = {
  PORT: env.get("PORT").required().asPortNumber(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
  SECRET_KEY_EMAIL: env.get("SECRET_KEY_EMAIL").required().asString(),
  PROD: env.get("PROD").required().asBool(),
  MAILER_SERVICES: env.get("MAILER_SERVICES").required().asString(),
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_DB_USER: env.get("MONGO_DB_USER").required().asString(),
  MONGO_PASS: env.get("MONGO_PASS").required().asString(),
  POSTGRES_URL: env.get("POSTGRES_URL").required().asString(),
  POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
  POSTGRES_DB: env.get("POSTGRES_DB").required().asString(),
  POSTGRES_PASSWORD: env.get("POSTGRES_PASSWORD").required().asString(),
};
