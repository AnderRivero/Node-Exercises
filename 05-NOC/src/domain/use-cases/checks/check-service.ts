import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}
  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: "check-service.ts",
      });
      this.successCallback && this.successCallback();
      this.logRepository.saveLog(log);

      if (!req.ok) {
        const mediumMessage = `Error on check service ${url}`;

        const log = new LogEntity({
          message: mediumMessage,
          level: LogSeverityLevel.medium,
          origin: "check-service.ts",
        });
        this.logRepository.saveLog(log);
        throw new Error(mediumMessage);
      }

      return true;
    } catch (error) {
      const errorMsg = `${url} is not ok - ERROR: ${error}`;
      this.errorCallback && this.errorCallback(errorMsg);
      this.logRepository.saveLog(
        new LogEntity({
          message: errorMsg,
          level: LogSeverityLevel.high,
          origin: "check-service.ts",
        })
      );
      return false;
    }
  }
}
