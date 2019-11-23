import * as React from 'react'
import logo from './logo.svg'
import './App.css'

import { appBuilder, Plugin, Injector, testInjector, LoggerService } from '@archy/core'
import LoggerPlugin from '@archy/console-logger'

appBuilder.use(LoggerPlugin)

appBuilder.use({
  type: 'view',
  name: 'testView',
  create: (injector: Injector) => {
    const logger = injector.getService('logger') as LoggerService
    logger.warn('TCL: testView', injector.getView('testView2'))
    return 'testView'
  }
} as Plugin)

appBuilder.use({
  type: 'view',
  name: 'testView2',
  create: (injector: Injector) => {
    const logger = injector.getService('logger') as LoggerService
    logger.info('TCL: testView2')
    return 'testView2'
  }
} as Plugin)

testInjector.getView('testView')

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
