export interface TokenService {
  /**
   * Устанавливает новый token на основе userKey.
   * @type {Function}
   * @param {String} userKey - новый token пользователя
   */
  setToken(userKey: string): void

  /**
   * Получить текущий token пользователя.
   * @type {Function}
   * @returns {String} token - текущий token пользователя
   */
  getToken(): string

  /**
   * Удалить текущий token пользователя.
   * @type {Function}
   */
  removeToken(): void
}