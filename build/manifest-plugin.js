const { readFile } = require('fs')
const { pkg } = require('read-pkg-up').sync()

class WebExtManifestPlugin {
  constructor(options) {
    this.options = Object.assign({
      template: 'src/manifest.json',
      filename: 'manifest.json'
    }, options)
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, done) => {
      readFile(this.options.template, 'utf-8', (err, data) => {
        if (err) {
          done(err)
          return
        }

        try {
          const initial = JSON.parse(data)
          initial.version = pkg.version

          const json = JSON.stringify(initial, null, 2)
          compilation.assets[this.options.filename] = {
            source: () => json,
            size: () => json.length
          }

          done()
        } catch (err) {
          done(err)
        }
      })
    })
  }
}

module.exports = WebExtManifestPlugin
