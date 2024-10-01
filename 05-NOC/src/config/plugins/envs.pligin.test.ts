import { evns } from "./envs.plugins";

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(evns).toEqual({
      PORT: 3000,
      MAILER_SERVICES: "gmail",
      MAILER_EMAIL: "rivero.ander@gmail.com",
      SECRET_KEY_EMAIL: "lgwhporqbciooqmn",
      PROD: false,
      MONGO_URL: "mongodb://monguito:123456789@localhost:27017/",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_DB_USER: "monguito",
      MONGO_PASS: "123456789",
      POSTGRES_URL: "postgresql://postgres:123456@localhost:5432/NOC",
      POSTGRES_USER: "postgres",
      POSTGRES_DB: "NOC-TEST",
      POSTGRES_PASSWORD: "123456",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./envs.plugins");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
