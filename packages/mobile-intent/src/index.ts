import { Linking, Share, NativeModules, Platform } from 'react-native'
import {
  IntentService,
  PlainTextParams,
  EMailParams,
  SmsParams,
  AppParams,
  AppParamsWithData,
  PluginFactory,
  Injector,
  AppResult
} from '@archy/core'

const { IntentLauncher } = NativeModules

class LinkingService implements IntentService {
  async sendText(params: PlainTextParams): Promise<any> {
    return Share.share({ message: params.text, title: params.title })
  }

  async sendMail(params: EMailParams): Promise<boolean> {
    if (Platform.OS === 'android') {
      return IntentLauncher.sendMail(params)
    } else {
      return false
    }
  }

  async sendSms(params: SmsParams): Promise<boolean> {
    if (Platform.OS === 'android') {
      return IntentLauncher.sendSms(params)
    } else {
      return false
    }
  }

  async sendPhoneCall(phoneNumber: string): Promise<boolean> {
    if (Platform.OS === 'android') {
      return IntentLauncher.sendPhoneCall(phoneNumber)
    } else {
      return false
    }
  }

  async isAppInstalled(appId: string): Promise<boolean> {
    if (Platform.OS === 'android') {
      return IntentLauncher.isAppInstalled(appId)
    } else {
      return false
    }
  }

  async openApp(params: AppParams): Promise<boolean> {
    if (Platform.OS === 'android') {
      return IntentLauncher.openApp(params)
    } else {
      return false
    }
  }

  async openSettings(screenId: string): Promise<boolean> {
    if (Platform.OS === 'android') {
      return IntentLauncher.openSettings(screenId)
    } else {
      return false
    }
  }

  async openAppWithResult(params: AppParamsWithData): Promise<AppResult> {
    if (Platform.OS === 'android') {
      return IntentLauncher.openAppWithResult(params)
    } else {
      return { data: 'not_supported' }
    }
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
