export type PlainTextParams = {
  title: string,
  text: string
}

export type EMailParams = {
  email: string,
  subject: string,
  body: string
}

export type SmsParams = {
  phoneNumber: string,
  smsBody: string
}

export type AppParams = {
  appId: string,
  extras: object
}

export type AppParamsWithData = AppParams & {
  data: any
}

export type AppResult = {
  data: string,
  extras: object,
  code: number
}

/**
 * @desc **Используемое название в контроллерах: intent.**
 * Сервис для осуществления Inter App Communication. Позволяет обращаться к
 * другим приложениям и передавать им параметры.
 * <br> На текущий момент имеет реализацию только для Android платформы
 */
export interface IntentService {
  sendText(params: PlainTextParams): Promise<any>
  sendMail(params: EMailParams): void
  sendSms(params: SmsParams): void
  sendPhoneCall(phoneNumber: string): void
  isAppInstalled(appId: string): Promise<boolean>
  openApp(params: AppParams): Promise<boolean>
  openSettings(screenId: string): void
  openAppWithResult(params: AppParamsWithData): Promise<AppResult>
  openURL(url: string): Promise<boolean>
}