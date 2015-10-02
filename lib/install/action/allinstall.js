'use strict'
var lifecycle = require('../../utils/lifecycle.js')
var packageId = require('../../utils/package-id.js')

module.exports = function (top, buildpath, pkg, log, next) {
  log.silly('allinstall', packageId(pkg), buildpath)
  lifecycle(pkg.package, 'preinstall', buildpath, false, false, andInstall)
  function andInstall () {
    lifecycle(pkg.package, 'install', pkg.path, false, false, andPostinstall)
  }
  function andPostInstall () {
    lifecycle(pkg.package, 'postinstall', pkg.path, false, false, next)
  }
}
