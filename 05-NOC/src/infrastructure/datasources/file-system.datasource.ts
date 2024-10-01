import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogPath = "logs/logs-all.log";
  private readonly mediumLogPath = "logs/logs-medium.log";
  private readonly highLogPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    [this.allLogPath, this.mediumLogPath, this.highLogPath].forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "");
      }
    });
  };

  private getLogsFromFile = (path: string): LogEntity[] => {
    const logs = fs.readFileSync(path, "utf8");
    if (logs === "") return [];
    return logs.split("\n").map(LogEntity.fromJson);
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const newLogAsJson = `${JSON.stringify(newLog)}\n`;
    fs.appendFileSync(this.allLogPath, newLogAsJson);

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogPath, newLogAsJson);
    } else {
      fs.appendFileSync(this.highLogPath, newLogAsJson);
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogPath);

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogPath);

      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogPath);
      default:
        throw new Error(`the level: ${severityLevel} is not implemented`);
    }
  }
}
