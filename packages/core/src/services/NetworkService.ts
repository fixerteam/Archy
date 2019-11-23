export type ConnectionInfo = {
  details: object,
  isConnected: boolean,
  isInternetReachable: boolean | null,
  type: string
}

/**
 * @desc **Используемое название в контроллерах: network.**<br />
 * Сервис для работы с сетевым соединением.
 * Все методы данного сервиса являются асинхронными.
 */
export interface NetworkService {
  /**
   * Получить информацию о соединении. В ответе могут присутствовать дополнительные атрибуты в зависимости от типа подключения.
   * **Только mobile версия.**
   * Возвращаемый объект представляет собой:
   * <pre>
   * {
   *  details:
   *    {
   *      isConnectionExpensive: boolean, - Определяет имеет ли сеть ограничения, может быть обусловлено пропускной способностью или в денежных затратах.
   *      cellularGeneration: string, - Обозначает тип подключения пользователя (4G, 3G, 2G...). Возможно отображение скорости соединения, но это не точно.
   *      ...
   *    },
   *  isConnected: boolean, - Указывает подключено ли устройство к сети. ОДНАКО, не обозначает есть ли доступ к интернету (см. след. пункт).
   *  isInternetReachable: boolean, - Обозначает, что устройство не только подключено к сети, но и имеет активное подключение к интернету.
   *  type: string, - Тип текущего подключения (none, unknown, wifi, cellular, bluetooth, ethernet, wimax, vpn, or other).
   * }
   * </pre>
   * @type {Function}
   * @returns {Promise<ConnectionInfo>} connectionInfo
   */
  getConnectionInfo(): Promise<ConnectionInfo>

  /**
   * Получить состояние соединения.
   * **Только mobile версия.**
   * true - устройство подключено к сети и может передавать и принимать данные, false - соединение отсутствует.
   * @type {Function}
   * @returns {Promise<Boolean>} true / false
   */
  isConnected(): Promise<boolean>

  /**
   * Установить обработчик изменения состояния подключения.
   * **Только mobile версия.**
   * Обратите внимание, что обработчик будет вызван при каждом изменении состояния подключения,
   * например: устройство потеряло доступ к интернету (isInternetReachable true/false),
   * изменился тип подключения (wifi -> 4g -> none -> 2g -> обработчик будет вызван 4 раза) и т.п.
   *
   * Нужно быть предельно осторожными, т.к. вызов обработчика может произойти не на том экране,
   * на который вы рассчитываете, и экранные компоненты будут недоступны. В общем случае нужно
   * удалять все обработчик при переходе на другой экран, это позволит избежать подобной проблемы.
   * (см. removeOnConnectionChange()) <br />
   * Оптимально handler положить в this в методе onCreate чтобы исключить ситуации, когда он перезаписывается при повторном вызове функций.
   * @type {Function}
   * @param {Function} [handler = (state) => {}] - функция обработчик (state содержит объект вида getConnectionInfo).
   * @example
   * const handler = state => {
   *   if(state.isConnected) {
   *     console.log('Соединение установлено')
   *   } else {
   *     console.log('Соединение разорвано')
   *   }
   * }
   * network.onConnectionChange(handler)
   */
  onConnectionChange(handler: (state: object) => void): void

  /**
   * Удаляет обработчик изменения состояния подключения.
   * **Только mobile версия.**
   * Выключение обработчика происходит с помощью вызова функции без передачи каких-либо параметров.
   * handler - именно та функция, которая была передана ранее в onConnectionChange
   * (т.е. нужно обратить внимание на scope). Оптимально handler положить в this в методе onCreate,
   * чтобы исключить ситуации, когда он перезаписывается при повторном вызове функций.
   * @example
   * const handler = state => {
   *   if(state.isConnected) {
   *     console.log('Соединение установлено')
   *   } else {
   *     console.log('Соединение разорвано')
   *   }
   * }
   * network.onConnectionChange(handler)
   * ...
   * перед переходом на другой экран:
   * network.removeOnConnectionChange()
   */
  removeOnConnectionChange(): void
}
