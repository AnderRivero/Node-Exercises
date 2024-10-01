import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckMultipleService } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const FSlogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);
const emailService = new EmailService();

export class Server {
  constructor() {}

  public static start() {
    console.log("Sever started!");

    /**
    new SendEmailLogs(emailService, logRepository).execute([
      "arivero@intelix.biz",
      "rivero.ander@gmail.com",
    ]);
 */
    const url = "https://google.com";

    const onTick = () => {
      new CheckMultipleService(
        [FSlogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log("Success " + url),
        (error) => console.error(error)
      ).execute(url);
    };
    CronService.createJob("*/5 * * * * *", onTick);
  }
}
