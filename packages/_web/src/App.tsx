import * as React from 'react'
import logo from './logo.svg'
import './App.css'

import { appBuilder, Plugin, ServicePlugin, Injector, testInjector } from '@archy/core'

appBuilder.use({
  type: 'view',
  name: 'testView',
  create: (injector: Injector) => {
    return 'testView'
  }
} as Plugin)

appBuilder.use({
  type: 'view',
  name: 'testView2',
  create: (injector: Injector) => {
    console.log('TCL: testView2', injector.getView('testView'))
    return 'test 2'
  }
} as Plugin)

appBuilder.use({
  type: 'service',
  name: 'logger',
  create: (injector: Injector) => injector.getView('testView2')
} as ServicePlugin)

console.log("TCL: testInjector.getView('testView2')", testInjector.getService('logger'))

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
