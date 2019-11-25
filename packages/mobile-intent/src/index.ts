import { Linking, Share, NativeModules } from 'react-native'
import { IntentService, PlainTextParams, EMailParams, SmsParams, AppParams, AppParamsWithData, AppResult, PluginFactory, Injector } from '@archy/core'

const { IntentLauncher } = NativeModules

class LinkingService implements IntentService {
  async sendText(params: PlainTextParams): Promise<any> {
    return Share.share({ message: params.text, title: params.title })
  }

  sendMail(params: EMailParams): void {
    IntentLauncher.sendEMail(params)
  }
  
  sendSms(params: SmsParams): void {
    IntentLauncher.sendSms(params)
  }

  sendPhoneCall(phoneNumber: string): void {
    IntentLauncher.callPhone(phoneNumber)
  }

  isAppInstalled(appId: string): Promise<boolean> {
    return IntentLauncher.isAppInstalled(appId)
  }

  openApp(params: AppParams): Promise<boolean> {
    return IntentLauncher.openApp(params)
  }

  openSettings(screenId: string): void {
    IntentLauncher.openSettings(screenId)
  }

  openAppWithResult(params: AppParamsWithData): Promise<AppResult> {
    return IntentLauncher.openAppWithResult(params)
  }

  async openURL(url: string): Promise<boolean> {
    const supported = await Linking.canOpenURL(url)
    if (supported) {
      return Linking.openURL(url)
    }
    return false
  }
}

export default PluginFactory.create({
  type: 'service',
  name: 'intent',
  create: (injector: Injector) => new LinkingService()
})
