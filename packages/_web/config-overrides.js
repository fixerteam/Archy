const { override, babelInclude } = require('customize-cra')
const fs = require('fs')
const getDevPaths = require('get-dev-paths')
const path = require('path')

const modules = getDevPaths(__dirname).map($ => fs.realpathSync($))

module.exports = (config, ...rest) => {
  /* Simply clones the object */
  const overriddenConfig = Object.assign(config, {})

  /* Remove the last item from the resolve plugins array. This should be ModuleScopePlugin */
  overriddenConfig.resolve.plugins.pop()

  const SPECIAL_BUILD = process.argv.indexOf('--special-build') !== -1

  const replacementsPlugin = overriddenConfig.plugins.find(plugin => plugin.hasOwnProperty('replacements'))
  if (replacementsPlugin) {
    replacementsPlugin.replacements.SPECIAL_BUILD = JSON.stringify(SPECIAL_BUILD)
  }

  const definitionPlugin = overriddenConfig.plugins.find(plugin => plugin.hasOwnProperty('definitions'))
  if (definitionPlugin) {
    definitionPlugin.definitions['process.env'].SPECIAL_BUILD = SPECIAL_BUILD
  }

  return Object.assign(
    overriddenConfig,
    override(
      /* Makes sure Babel compiles the stuff in the common folder */
      babelInclude([
        path.resolve('src'), // don't forget this
        modules
      ])
    )(overriddenConfig, ...rest)
  )
}
