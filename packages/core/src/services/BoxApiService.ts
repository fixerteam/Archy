/**
 * @desc **Используемое название в контроллерах: api.**<br />
 * Сервис для работы с серверным Rest API.
 * Позволяет осуществлять общение с сервером с помощью механизма Promise.
 * Все методы данного сервиса являются асинхронными.
 */
export interface BoxApiService {
  /**
   * Проверка доступности сервера.
   * @type {Function}
   * @returns {Promise<Boolean>} status - статус сервера: true - жив, false - мертв.
   */
  check(): Promise<boolean>

  /**
   * Авторизация пользователя с помощью токена вида "<project>_<env>_<userKey>" или "userKey"
   * при успешной авторизации сохраняет токен для доступа из контроллеров и
   * других методов Api
   * @type {Function}
   * @param {String} token - токен вида "<project>_<env>_<userKey>" или "userKey"
   * @returns {Promise<Object>} userData - объект с данными пользователя
   */
  loginByToken(token: string): Promise<object>

  /**
   * Авторизация пользователя по логину и паролю.
   * Возвращает promise с данными пользователя или выбрасывает ошибку если что-то пошло не так
   * (нужно её перехватывать с помощью catch()) <br />
   * Если передан externalService, система пытается обратиться к сервису внешней авторизации
   * через интегратор (в интеграторе должен быть реализован метод auth для этого сервиса).
   * @param {String} login - логин пользователя
   * @param {String} password - пароль пользователя
   * @param {String} externalService - cервис внешней авторизации
   * @returns {Promise<Object>} userData - объект с данными пользователя
   */
  login(login: string, password: string, externalService: string): Promise<object>

  /**
   * Деавторизация пользователя.
   * @type {Function}
   * @returns {Promise} - результат выполнения запроса
   */
  logout(): Promise<void>

  /**
   * Метод отправляет запрос к сервису-интегратору с заданными параметрами.
   * <pre>
   * {
   *   model - Модель (сущность) интегратора, которая будет вызывать переданный метод. Обязательно.
   *   method - Метод сущности интегратора. Обязательно. См. полный список методов интегратора.
   *   params - Параметры, принимаемые методом сущности интегратора. Опционально (в зависимости от метода некоторые параметры могут быть обязательными).
   *   auth - Указатель, нужно ли дополнительно передавать данные авторизации клиента при запросе к интегратору. Опционально. По умолчанию false.
   * }
   * </pre>
   * @type {Function}
   * @param {Object} data - данные в описанном формате
   * @returns {Promise<Object>} response - данные от интегратора
   */
  integrator(data: object): Promise<object>
}
