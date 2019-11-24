import { Injector } from './Injector'

type ServiceOptions = { private?: boolean; custom?: boolean }

type PluginParams = Plugin & ServiceOptions

export type Plugin = {
  type: 'view' | 'widget' | 'service'
  name: string
  create: Creator | Function
}

export type ServicePlugin = Plugin & ServiceOptions & { type: 'service' }

export type Creator = <T>(injector: Injector) => T

export type LazyCreator = <T>() => T

export default class PluginFactory {
  static create(params: PluginParams): Plugin | ServicePlugin {
    return params
  }
}
