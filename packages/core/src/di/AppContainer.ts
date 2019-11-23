import { Plugin, ServicePlugin, LazyCreator } from './PluginTypes'
import { Injector } from './Injector'

export interface AppBuilder {
  use(plugin: Plugin): void
}

export class AppContainer implements Injector, AppBuilder {
  private pluginClassCache = new Map<String, any>()
  private services = new Map<String, LazyCreator>()
  private widgets = new Map<String, LazyCreator>()
  private views = new Map<String, LazyCreator>()

  getService<T>(name: string): T {
    const servicePlugin = this.services.get(name)
    if (servicePlugin) {
      return servicePlugin()
    }
    throw Error(`DI: Service plugin ${name} not found`)
  }

  getWidget<T>(name: string): T {
    const widgetPlugin = this.widgets.get(name)
    if (widgetPlugin) {
      return widgetPlugin()
    }
    throw Error(`DI: Widget plugin ${name} not found`)
  }

  getView<T>(name: string): T {
    const viewPlugin = this.views.get(name)
    if (viewPlugin) {
      return viewPlugin()
    }
    throw Error(`DI: View plugin ${name} not found`)
  }

  use(plugin: Plugin | Array<Plugin>) {
    if (Array.isArray(plugin)) {
      plugin.forEach(item => this.usePlugin(item))
    } else {
      this.usePlugin(plugin)
    }
  }

  private initService<T>(servicePlugin: ServicePlugin): T {
    const { name, create } = servicePlugin
    if (!this.pluginClassCache.has(name)) {
      const instance = create<T>(this)
      if (servicePlugin.private) {
        Object.defineProperty(instance, 'private', {
          writable: false,
          configurable: false,
          enumerable: false,
          value: true
        })
      }
      if (servicePlugin.custom) {
        Object.defineProperty(instance, 'custom', {
          writable: false,
          configurable: false,
          enumerable: false,
          value: true
        })
      }
      this.pluginClassCache.set(name, instance)
    }
    return this.pluginClassCache.get(name)
  }

  private usePlugin(plugin: Plugin) {
    switch (plugin.type) {
      case 'service':
        // Because services should be re-initialized after app restart
        this.services.set(plugin.name, () => this.initService(plugin as ServicePlugin))
        break
      case 'widget':
        if (!this.widgets.has(plugin.name)) {
          this.widgets.set(plugin.name, () => plugin.create(this))
        }
        break
      case 'view':
        if (!this.views.has(plugin.name)) {
          this.views.set(plugin.name, () => plugin.create(this))
        }
        break
    }
  }
}
