export interface Injector {
  getService<T>(name: string): T
  getWidget<T>(name: string): T
  getView<T>(name: string): T
}
