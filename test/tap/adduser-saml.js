var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var mr = require('npm-registry-mock')

var test = require('tap').test
var common = require('../common-tap.js')

var opts = { cwd: __dirname }
var pkg = path.resolve(__dirname, 'adduser-saml')
var outfile = path.resolve(pkg, '_npmrc')

function mocks (server) {
  server.filteringRequestBody(function (r) {
    if (r.match(/"_id":"org\.couchdb\.user:npm_saml_auth_dummy_user"/)) {
      return 'auth'
    }
  })
  var authenticated = false
  server.put('/-/user/org.couchdb.user:npm_saml_auth_dummy_user', 'auth')
    .reply(200, { token: 'foo', url: common.registry + '/-/saml/foo' })
  server.get('/-/saml/foo', function () { authenticated = true })
    .reply(200, {})
  server.get(
    '/-/whoami', 'auth'
  ).many().reply(function () {
    if (authenticated) {
      return [201, { username: 'igotauthed' }]
    } else {
      return [401, {}]
    }
  })
}

test('setup', function (t) {
  mkdirp.sync(pkg)
  fs.writeFileSync(outfile, '')
  t.end()
})

test('npm login', function (t) {
  mr({ port: common.port, plugin: mocks }, function (er, s) {
    var runner = common.npm(
      [
        'login',
        '--registry', common.registry,
        '--auth-type=saml',
        '--loglevel', 'silent',
        '--userconfig', outfile
      ],
      opts,
      function (err, code, stdout, stderr) {
        t.ifError(err, 'npm ran without issue')
        t.equal(code, 0, 'exited OK')
        t.notOk(stderr, 'no error output')
        var config = fs.readFileSync(outfile, 'utf8')
        t.like(config, /:always-auth=false/, 'always-auth is scoped and false (by default)')
        s.close()
        rimraf(outfile, function (err) {
          t.ifError(err, 'removed config file OK')
          t.end()
        })
      }
    )

    var remaining = Object.keys(responses).length
    runner.stdout.on('data', function (chunk) {
      if (remaining > 0) {
        remaining--

        var label = chunk.toString('utf8').split(':')[0]
        runner.stdin.write(responses[label])

        if (remaining === 0) runner.stdin.end()
      } else {
        var message = chunk.toString('utf8').trim()
        t.equal(message, 'Logged in as u on ' + common.registry + '/.')
      }
    })
  })
})

test('cleanup', function (t) {
  rimraf.sync(pkg)
  t.pass('cleaned up')
  t.end()
})
