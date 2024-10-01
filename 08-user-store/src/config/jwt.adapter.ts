import jwt from "jsonwebtoken";
import { envs } from "./envs";

export class JwtGenerator {
  static async generateToken(payload: any, duration: string = "2h") {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_SEED,
        { expiresIn: duration },
        (err, token) => {
          if (err) return resolve(null);
          resolve(token);
        }
      );
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SEED, (err, token) => {
        if (err) return resolve(null);
        return resolve(token as T);
      });
    });
  }
}
