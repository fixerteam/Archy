import { AppRegistry } from 'react-native'
import MobileLauncher from '@archy/mobile-launcher'
import IntentLauncher from '@archy/mobile-intent'
import { appBuilder } from '@archy/core'
import { name as appName } from './app.json'

appBuilder.use(MobileLauncher)
appBuilder.use(IntentLauncher)

AppRegistry.registerComponent(appName, () => appBuilder.launcher())
