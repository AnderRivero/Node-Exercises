import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckMultipleService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: "check-service.ts",
      });
      this.successCallback && this.successCallback();
      this.callLogs(log);

      if (!req.ok) {
        const mediumMessage = `Error on check service ${url}`;

        const log = new LogEntity({
          message: mediumMessage,
          level: LogSeverityLevel.medium,
          origin: "check-service.ts",
        });
        this.callLogs(log);
        throw new Error(mediumMessage);
      }

      return true;
    } catch (error) {
      const errorMsg = `${url} is not ok - ERROR: ${error}`;
      this.errorCallback && this.errorCallback(errorMsg);
      this.callLogs(
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
