import { LoggerService, LogLevel, ServicePlugin, Injector } from '@archy/core'

class ConsoleLogger implements LoggerService {
  private logLevel = LogLevel.verbose

  setLogLevel(level: LogLevel): void {
    this.logLevel = level
  }
  error(...messages: any[]): void {
    console.error(...messages)
  }
  info(...messages: any[]): void {
    if (this.logLevel <= LogLevel.info) {
      console.info(...messages)
    }
  }
  log(...messages: any[]): void {
    if (this.logLevel <= LogLevel.verbose) {
      console.log(...messages)
    }
  }
  warn(...messages: any[]): void {
    if (this.logLevel <= LogLevel.warning) {
      console.warn(...messages)
    }
  }
}

export default {
  type: 'service',
  name: 'logger',
  create: (injector: Injector) => new ConsoleLogger()
} as ServicePlugin
