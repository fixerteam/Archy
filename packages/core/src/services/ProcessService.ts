type Process = {
  id: string,
  func: Function,
  maxAttempts: number,
  retryTimeout: number,
  delay: number,
  interval?: boolean
}

enum Status {
  new, running, error, canceled, completed
}

enum ProcessType {
  foreground, background
}

type CurrentProcess = {
  id: string,
  status: Status,
  type: ProcessType
}

/**
 * @desc **Используемое название в контроллерах: process.**<br />
 * Сервис для работы с фоновыми процессами (foreground и background).
 * Background процессы работают только в mobile.
 */
export interface ProcessService {
  /**
   * Запустить процесс при активном состоянии приложения.
   * Если данный процесс уже существует и находится в одном из конечных состояний, переопределяем его.
   * **Процесс выполнится только при активном приложении/вкладке (foreground)**
   * @type {Function}
   * @param {Object} params - параметры процесса
   * @param {String} params.id - идентификатор процесса
   * @param {Function} params.func - функция для выполнения в фоне
   * @param {Number} params.maxAttempts - максимальное количество попыток
   * @param {Number} params.retryTimeout - таймаут между попытками в секундах
   * @param {Number} params.delay - задержка перед выполнением функции в секундах
   * @param {Boolean} params.interval - если *true* выполнение функции каждые *delay* секунд, пока процесс не будет отменен
   */
  runForeground(params: Process): void

  /**
   * Запустить процесс как фоновую службу.
   * Процесс выполнится с периодичностью delay секунд (минимум 15 минут) в зависимости от состояния ОС,
   * фазы луны и настроения пользователя (мы не гарантируем его выполнение 100%, на iOS пользователь может вовсе запретить подобное).
   * **В WEB не работает**
   * @type {Function}
   * @param {Object} params - параметры процесса
   * @param {String} params.id - идентификатор процесса
   * @param {Function} params.func - функция для выполнения в фоне
   * @param {Number} params.maxAttempts - максимальное количество попыток
   * @param {Number} params.retryTimeout - таймаут между попытками в секундах
   * @param {Number} params.delay - задержка перед выполнением функции в секундах
   */
  runBackground(params: Process): void

  /**
   * Принудительно перезапустить процесс, если он существует.
   * @type {Function}
   * @param {String} id - идентификатор процесса
   */
  retry(id: string): void

  /**
   * Получить список текущих процессов и их статусов.
   * Каждый возвращаемый процесс представляет собой:
   * ```javascript
   * {
   *   id: {String},    // идентификатор процесса (задается конфигуратором)
   *   status: {String},// его статус (new, running, error, canceled, completed)
   *   type: {String}   // тип процесса (foreground или background)
   * }
   * ```
   * @type {Function}
   * @returns {Array<Object>} processList
   */
  list(): Array<CurrentProcess>

  /**
   * Отменить процесс с идентификатором id, оставляя процесс в очереди со статусом CANCELED.
   * @type {Function}
   * @param {String} id - идентификатор процесса
   */
  cancel(id: string): void

  /**
   * Очистить очередь процессов, предварительно отменив их выполнение.
   * @type {Function}
   */
  clear(): void

  /**
   * Удалить процесс с идентификатором id из очереди, предварительно отменив его выполнение
   * @type {Function}
   * @param {String} id - идентификатор процесса
   */
  remove(id: string): void
}