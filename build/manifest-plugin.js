const {readFile} = require('fs')
const {pkg} = require('read-pkg-up').sync()

class WebExtManifestPlugin {
  constructor(options) {
    this.plugin = {
      name: 'WebExtManifestPlugin'
    }

    this.options = Object.assign({
      template: 'src/manifest.json',
      filename: 'manifest.json'
    }, options)
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(this.plugin, (compilation, callback) => {
      readFile(this.options.template, 'utf-8', (err, data) => {
        if (err) {
          return callback(err)
        }

        try {
          const initial = JSON.parse(data)
          initial.version = pkg.version

          const json = JSON.stringify(initial, null, 2)
          compilation.assets[this.options.filename] = {
            source: () => json,
            size: () => json.length
          }

          callback()
        } catch (error) {
          callback(error)
        }
      })
    })
  }
}

module.exports = WebExtManifestPlugin
