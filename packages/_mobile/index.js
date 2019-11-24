import { AppRegistry } from 'react-native'
import MobileLauncher from '@archy/mobile-launcher'
import { appBuilder } from '@archy/core'
import { name as appName } from './app.json'

appBuilder.use(MobileLauncher)

AppRegistry.registerComponent(appName, () => appBuilder.launcher())
