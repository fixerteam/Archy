export enum LogLevel {
  verbose,
  info,
  warning,
  configuration_only,
  error
}

/**
 * @desc **Используемое название в контроллерах: logger.**<br />
 * Сервис для журналирования событий. Следует использовать вместо **console**,
 * так как вывод логера может быть собран и отправлен в техподдержку
 * (пока это не реализовано но в будущем именно так и будет работать)
 */
export interface LoggerService {
  /**
   * Установить уровень логирования.
   * @type {Function}
   * @param {LogLevel} level - уровень логирования,
   * где level это: verbose, info, warning, configuration_only, error.
   * По умолчанию: LogLevel.verbose
   */
  setLogLevel(level: LogLevel): void

  /**
   * Логировать сообщение об ошибке
   * @type {Function}
   * @param {...String} messages - сообщения, разделенные запятыми
   */
  error(...messages: Array<any>): void

  /**
   * Логировать сообщение платформы
   * Должно использоваться только для логирования внутренних сообщений платформы.
   * @type {Function}
   * @param {...String} messages - сообщения, разделенные запятыми
   * @ignore
   */
  info(...messages: Array<any>): void

  /**
   * Логировать сообщение
   * @type {Function}
   * @param {...String} messages - сообщения, разделенные запятыми
   */
  log(...messages: Array<any>): void

  /**
   * Логировать предупреждение
   * @type {Function}
   * @param {...String} messages - сообщения, разделенные запятыми
   */
  warn(...messages: Array<any>): void
}
