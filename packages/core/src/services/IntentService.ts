export type PlainTextParams = {
  title: string
  text: string
}

export type EMailParams = {
  emails: Array<string>
  subject: string
  body: string
}

export type SmsParams = {
  phoneNumber: string
  smsBody: string
}

export type AppParams = {
  appId: string
  extras?: object
}

export type AppParamsWithData = {
  action: string
  data: string
  extras?: object
}

export type AppResult = {
  data: string
  extras?: object
}

/**
 * @desc **Используемое название в контроллерах: intent.**
 * Сервис для осуществления Inter App Communication. Позволяет обращаться к
 * другим приложениям и передавать им параметры.
 * <br> На текущий момент имеет реализацию только для Android платформы
 */
export interface IntentService {
  sendText(params: PlainTextParams): Promise<any>

  sendMail(params: EMailParams): Promise<boolean>

  sendSms(params: SmsParams): Promise<boolean>

  sendPhoneCall(phoneNumber: string): Promise<boolean>

  isAppInstalled(appId: string): Promise<boolean>

  openApp(params: AppParams): Promise<boolean>

  /**
   * @param screenId https://developer.android.com/reference/android/provider/Settings.html
   */
  openSettings(screenId: string): Promise<boolean>

  openAppWithResult(params: AppParamsWithData): Promise<AppResult>

  openURL(url: string): Promise<boolean>
}
