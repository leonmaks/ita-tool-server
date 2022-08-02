import { default as winston, format, transports } from 'winston'

export class LoggerConfig {
  private readonly options: winston.LoggerOptions

  constructor() {
    this.options = {
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(
          ({ level, message }) => `[${level}] - ${message}`
          // return `${msg.timestamp} [${msg.level}] - ${msg.message}`
        )),
      // alert > error > warning > notice > info > debug
      transports: [new transports.Console({
        level: "debug"
      })],
    }
  }

  public console(): object {
    return this.options
  }
}
