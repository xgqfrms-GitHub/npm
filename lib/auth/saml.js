var log = require('npmlog')
var npm = require('../npm.js')
var output = require('../utils/output')
var opener = require('opener')

module.exports.login = function login (creds, registry, scope, cb) {
  var params = {
    // We're reusing the legacy login endpoint, so we need some dummy
    // stuff here to pass validation. They're never used.
    auth: {
      username: 'npm_saml_auth_dummy_user',
      password: 'placeholder',
      email: 'support@npmjs.com'
    }
  }
  npm.registry.adduser(registry, params, function (er, doc) {
    if (er) return cb(er)
    if (!doc || !doc.token) return cb(new Error('no SAML token returned'))

    output('Opening browser to complete authentication.')
    output('If your browser doesn\'t open, visit ' +
           doc.url +
           ' to complete authentication')
    opener(doc.url, { command: npm.config.get('browser') }, function () {
      pollForSession(registry, doc.token, function (err, username) {
        if (err) return cb(err)

        log.info('adduser', 'Authorized user %s', username)
        var scopeMessage = scope ? ' to scope ' + scope : ''
        output('Logged in as %s%s on %s.', username, scopeMessage, registry)

        cb(null, { token: doc.token })
      })
    })
  })
}

function pollForSession (registry, token, cb) {
  npm.registry.whoami(registry, {
    auth: {
      token: token
    }
  }, function (er, username) {
    if (er) return cb(er)
    if (!username) {
      setTimeout(function () {
        pollForSession(registry, token, cb)
      }, npm.config.get('saml-poll-frequency') || 500)
    } else {
      cb(null, username)
    }
  })
}
