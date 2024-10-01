import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  constructor() {}
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await prisma.logModel.create({
      data: {
        level: severityEnum[log.level],
        message: log.message,
        origin: log.origin,
      },
    });
    console.log(newLog);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = (
      await prisma.logModel.findMany({
        where: { level: severityEnum[severityLevel] },
      })
    ).map(LogEntity.fromObject);
    return logs;
  }
}
