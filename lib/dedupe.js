var util = require('util')
var path = require('path')
var validate = require('aproba')
var without = require('lodash.without')
var asyncMap = require('slide').asyncMap
var chain = require('slide').chain
var npa = require('npm-package-arg')
var log = require('npmlog')
var npm = require('./npm.js')
var Installer = require('./install.js').Installer
var findRequirement = require('./install/deps.js').findRequirement
var earliestInstallable = require('./install/deps.js').earliestInstallable
var loadExtraneous = require('./install/deps.js').loadExtraneous
var recalculateMetadata = require('./install/deps.js').recalculateMetadata
var removeObsoleteDep = require('./install/deps.js').removeObsoleteDep
var moduleName = require('./utils/module-name.js')
var packageId = require('./utils/package-id.js')
var childPath = require('./utils/child-path.js')
var usage = require('./utils/usage')

module.exports = dedupe
module.exports.Deduper = Deduper

dedupe.usage = usage(
  'dedupe',
  'npm dedupe'
)

function dedupe (args, cb) {
  validate('AF', arguments)
  // the /path/to/node_modules/..
  var where = path.resolve(npm.dir, '..')
  var dryrun = false
  if (npm.command.match(/^find/)) dryrun = true
  if (npm.config.get('dry-run')) dryrun = true

  new Deduper(where, dryrun).run(cb)
}

function Deduper (where, dryrun) {
  validate('SB', arguments)
  Installer.call(this, where, dryrun, [])
  this.noPackageJsonOk = true
  this.topLevelLifecycles = false
}
util.inherits(Deduper, Installer)

Deduper.prototype.normalizeTree = function (log, cb) {
  validate('OF', arguments)
  log.silly('dedupe', 'normalizeTree')
  // If we're looking globally only look at the one package we're operating on
  if (npm.config.get('global')) {
    var args = this.args
    this.currentTree.children = this.currentTree.children.filter(function (child) {
      return args.filter(function (arg) { return arg === moduleName(child) }).length
    })
  }
  Installer.prototype.normalizeTree.call(this, log, cb)
}

Deduper.prototype.loadIdealTree = function (cb) {
  validate('F', arguments)
  log.silly('install', 'loadIdealTree')

  var self = this
  chain([
    [this.newTracker(this.progress.loadIdealTree, 'cloneCurrentTree')],
    [this, this.cloneCurrentTreeToIdealTree],
    [this, this.finishTracker, 'cloneCurrentTree'],

    [this.newTracker(this.progress.loadIdealTree, 'loadAllDepsIntoIdealTree', 10)],
    [ function (next) {
      loadExtraneous(self.idealTree, self.progress.loadAllDepsIntoIdealTree, next)
    } ],
    [this, this.finishTracker, 'loadAllDepsIntoIdealTree'],

    [this, function (next) { recalculateMetadata(this.idealTree, log, next) }],

    [this.newTracker(log, 'hoist', 1)],
    [this, this.hoistChildren],
    [this, this.finishTracker, 'hoist'],

    [this, function (next) { recalculateMetadata(this.idealTree, log, next) }],
  ], cb)
}

function move (node, hoistTo) {
  node.parent.children = without(node.parent.children, node)
  hoistTo.children.push(node)
  node.fromPath = node.path
  node.path = childPath(hoistTo.path, node)
  node.parent = hoistTo
}

function moveRemainingChildren (node) {
  node.children.forEach(function (child) {
    move(child, node)
    moveRemainingChildren(child)
  })
}

function remove (child, done) {
  removeObsoleteDep(child)
  remove_(child, {}, done)
}

function remove_ (child, seen, done) {
  if (seen[child.path]) return done()
  seen[child.path] = true
  child.parent.children = without(child.parent.children, child)
  asyncMap(child.children, function (child, next) {
    remove_(child, seen, next)
  }, done)
}

Deduper.prototype.hoistChildren = function (next) {
  hoistChildren_(this.idealTree, {}, next)
}

function withCb(fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    var cb = args.pop()
    try {
      var result = fn.apply(null, args)
    } catch (ex) {
      return cb(ex)
    }
    return cb(null, result)
  }
}

var globalSeen = {}
function hoistChildren_ (tree, seen, next) {
  validate('OOF', arguments)
  if (seen[tree.path]) return next()
  if (globalSeen[tree.path]) {
    log.warn('hostChildren_', tree.path, globalSeen, seen)
    return next()
  }
  globalSeen[tree.path] = true
  seen[tree.path] = true
  asyncMap(tree.children, function (child, done) {
    if (!tree.parent) return hoistChildren_(child, seen, done)
    log.silly('hoistChildren', 'hoisting', packageId(child))
    child.removed = true
    var better = findRequirement(tree, moduleName(child), child.package._requested || npa(packageId(child)))
    child.removed = false
    if (better) {
      return chain([
        [remove, child]
      ], done)
    }
    // mark as removed so that we don't force deduping to keep the child
    // where it is
    child.removed = true
    var hoistTo = earliestInstallable(tree, tree, child.package)
    child.removed = false
    if (hoistTo) {
      move(child, hoistTo)
      chain([
        [hoistChildren_, child, seen],
        [withCb(moveRemainingChildren), child]
      ], done)
    } else {
      done()
    }
  }, next)
}
