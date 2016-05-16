'use strict'
var path = require('path')
var test = require('tap').test
var Tacks = require('tacks')
var Dir = Tacks.Dir
var Symlink = Tacks.Symlink
var common = require('../common-tap.js')

var workdir = path.join(__dirname, path.basename(__filename, '.js'))
var exampledir = path.join('workdir', 'workdir')

var fixture = new Tacks(Dir({
  'example': Symlink('/does/not/exist')
}))

function setup () {
  cleanup()
  fixture.create(workdir)
}

function cleanup () {
  fixture.remove(workdir)
}

test('setup', function (t) {
  setup()
  t.end()
})

test('outdated', function (t) {
  common.npm(['outdated', '--prefix', exampledir], {cwd: workdir, stdio: 'inherit'}, function (err, code) {
    if (err) throw err
    t.is(code, 0)
    t.end()
  })
})

test('cleanup', function (t) {
  cleanup()
  t.end()
})
