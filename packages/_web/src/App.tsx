import * as React from 'react'
import logo from './logo.svg'
import './App.css'

import { appBuilder, PluginFactory, Injector, testInjector, LoggerService } from '@archy/core'
import LoggerPlugin from '@archy/console-logger'

appBuilder.use(LoggerPlugin)

appBuilder.use(
  PluginFactory.create({
    type: 'view',
    name: 'testView',
    create: (injector: Injector) => {
      const logger = injector.getService('logger') as LoggerService
      logger.info('TCL: testView2')
      return ''
    }
  })
)

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
