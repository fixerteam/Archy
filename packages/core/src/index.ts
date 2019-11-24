import { AppContainer, AppBuilder } from './di/AppContainer'

const appContainer = new AppContainer()

export * from './services'
export * from './di/Injector'
export { default as PluginFactory } from './di/PluginTypes'

export const appBuilder: AppBuilder = appContainer
export const testInjector: AppContainer = appContainer
