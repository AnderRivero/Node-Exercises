export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    this.message = options.message;
    this.level = options.level;
    this.createdAt = options.createdAt || new Date();
    this.origin = options.origin;
  }

  public static fromJson = (json: string) => {
    json = json === "" ? "{}" : json;
    const { message, level, createdAt, origin } = JSON.parse(json);

    const logEntity = new LogEntity({
      message,
      level,
      createdAt: new Date(createdAt),
      origin,
    });

    return logEntity;
  };

  public static fromObject = (object: { [key: string]: any }) => {
    const { message, level, createdAt, origin } = object;

    const logEntity = new LogEntity({
      message,
      level,
      createdAt: new Date(createdAt),
      origin,
    });

    return logEntity;
  };
}
