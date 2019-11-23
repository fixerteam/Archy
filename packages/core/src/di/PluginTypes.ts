import { Injector } from './Injector'

export type Plugin = {
  type: 'view' | 'widget' | 'service'
  name: string
  create: Creator
}

export type ServicePlugin = Plugin & {
  type: 'service'
  private: boolean
  custom: boolean
}

export type Creator = <T>(injector: Injector) => T

export type LazyCreator = <T>() => T
