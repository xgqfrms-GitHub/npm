
module.exports = exports = search

var npm = require('./npm.js')
var columnify = require('columnify')
var updateIndex = require('./cache/update-index.js')
var usage = require('./utils/usage')
var output = require('./utils/output.js')
var log = require('npmlog')
var jsonstream = require('JSONStream')
var ms = require('mississippi')

search.usage = usage(
  'search',
  'npm search [--long] [search terms ...]'
)

search.usage = 'npm search [--long] [search terms ...]' +
               '\n\naliases: s, se'

search.completion = function (opts, cb) {
  cb(null, [])
}

function search (args, silent, staleness, cb) {
  if (typeof cb !== 'function') {
    cb = staleness
    staleness = 600
  }
  if (typeof cb !== 'function') {
    cb = silent
    silent = false
  }

  var searchopts = npm.config.get('searchopts')
  var searchexclude = npm.config.get('searchexclude')
  if (npm.config.get('searchsort', 'cli')) {
    log.warn('search', 'Search result sorting not currently supported')
  }

  if (typeof searchopts !== 'string') searchopts = ''
  searchopts = searchopts.split(/\s+/)
  var opts = searchopts.concat(args).map(function (s) {
    return s.toLowerCase()
  }).filter(function (s) { return s })

  if (opts.length === 0) {
    return cb(new Error('search must be called with arguments'))
  }

  if (typeof searchexclude === 'string') {
    searchexclude = searchexclude.split(/\s+/)
  } else {
    searchexclude = []
  }
  searchexclude = searchexclude.map(function (s) {
    return s.toLowerCase()
  })

  updateIndex(staleness, function (er, stream) {
    if (er) return cb(er)
    log.silly('search', 'searching packages')
    var matchCount = 0
    var filterStream = ms.through.obj(function (pkg, enc, cb) {
      log.gauge.pulse('search')
      log.gauge.show({section: '🤔 search', logline: 'scanning ' + pkg.name})
      if (!silent && filter(pkg, opts, searchexclude)) {
        matchCount++
        cb(null, pkg)
      } else {
        cb()
      }
    })

    var outputStream = npm.config.get('json')
    ? ms.pipeline.obj(
      ms.through.obj(),
      jsonstream.stringify('[', ',', ']'),
      ms.through(function (chunk, enc, cb) {
        cb(null, chunk.toString('utf8'))
      })
    )
    : ms.through.obj(function (pkg, enc, cb) {
      cb(null, prettify(pkg, matchCount, args))
    })

    stream = ms.pipeline.obj(stream, filterStream, outputStream)
    stream.on('data', output)
    ms.finished(stream, function (er) {
      if (er) return cb(er)
      if (!matchCount) {
        output('No matches found for ' + (args.map(JSON.stringify).join(' ')))
      }
      log.silly('search', 'index search completed')
      log.clearProgress()
      cb(null, {})
    })
  })
}

function filter (data, args, notArgs) {
  return typeof data === 'object' &&
         filterWords(getWords(stripData(data)), args, notArgs)
}

function stripData (data) {
  return {
    name: data.name,
    description: npm.config.get('description') ? data.description : '',
    maintainers: (data.maintainers || []).map(function (m) {
      return '=' + m.name
    }),
    url: !Object.keys(data.versions || {}).length ? data.url : null,
    keywords: data.keywords || [],
    version: Object.keys(data.versions || {})[0] || [],
    time: data.time &&
          data.time.modified &&
          (new Date(data.time.modified).toISOString() // remove time
            .split('T').join(' ')
            .replace(/:[0-9]{2}\.[0-9]{3}Z$/, ''))
            .slice(0, -5) ||
          'prehistoric'
  }
}

function getWords (data) {
  data.words = [ data.name ]
               .concat(data.description)
               .concat(data.maintainers)
               .concat(data.url && ('<' + data.url + '>'))
               .concat(data.keywords)
               .map(function (f) { return f && f.trim && f.trim() })
               .filter(function (f) { return f })
               .join(' ')
               .toLowerCase()
  return data
}

function filterWords (data, args, notArgs) {
  var words = data.words
  for (var i = 0, l = args.length; i < l; i++) {
    if (!match(words, args[i])) return false
  }
  for (i = 0, l = notArgs.length; i < l; i++) {
    if (match(words, notArgs[i])) return false
  }
  return true
}

function match (words, arg) {
  if (arg.charAt(0) === '/') {
    arg = arg.replace(/\/$/, '')
    arg = new RegExp(arg.substr(1, arg.length - 1))
    return words.match(arg)
  }
  return words.indexOf(arg) !== -1
}

function prettify (data, num, args) {
  var truncate = !npm.config.get('long')

  var dat = stripData(data)
  dat.author = dat.maintainers
  delete dat.maintainers
  dat.date = dat.time
  delete dat.time
  // split keywords on whitespace or ,
  if (typeof dat.keywords === 'string') {
    dat.keywords = dat.keywords.split(/[,\s]+/)
  }
  if (Array.isArray(dat.keywords)) {
    dat.keywords = dat.keywords.join(' ')
  }

  // split author on whitespace or ,
  if (typeof dat.author === 'string') {
    dat.author = dat.author.split(/[,\s]+/)
  }
  if (Array.isArray(dat.author)) {
    dat.author = dat.author.join(' ')
  }

  var columns = npm.config.get('description')
  ? ['name', 'description', 'author', 'date', 'version', 'keywords']
  : ['name', 'author', 'date', 'version', 'keywords']

  if (npm.config.get('tab-separated')) {
    return columns.map(function (col) {
      return dat[col].replace('\t', ' ')
    }).join('\t')
  }

  var output = columnify(
    [dat],
    {
      include: columns,
      showHeaders: num <= 1,
      columnSplitter: ' | ',
      truncate: truncate,
      config: {
        name: { minWidth: 25, maxWidth: 25, truncate: false, truncateMarker: '' },
        description: { minWidth: 20, maxWidth: 20 },
        author: { minWidth: 15, maxWidth: 15 },
        date: { maxWidth: 11 },
        version: { minWidth: 8, maxWidth: 8 },
        keywords: { maxWidth: Infinity }
      }
    }
  )
  output = trimToMaxWidth(output)
  output = highlightSearchTerms(output, args)

  return output
}

var colors = [31, 33, 32, 36, 34, 35]
var cl = colors.length

function addColorMarker (str, arg, i) {
  var m = i % cl + 1
  var markStart = String.fromCharCode(m)
  var markEnd = String.fromCharCode(0)

  if (arg.charAt(0) === '/') {
    return str.replace(
      new RegExp(arg.substr(1, arg.length - 2), 'gi'),
      function (bit) { return markStart + bit + markEnd }
    )
  }

  // just a normal string, do the split/map thing
  var pieces = str.toLowerCase().split(arg.toLowerCase())
  var p = 0

  return pieces.map(function (piece) {
    piece = str.substr(p, piece.length)
    var mark = markStart +
               str.substr(p + piece.length, arg.length) +
               markEnd
    p += piece.length + arg.length
    return piece + mark
  }).join('')
}

function colorize (line) {
  for (var i = 0; i < cl; i++) {
    var m = i + 1
    var color = npm.color ? '\u001B[' + colors[i] + 'm' : ''
    line = line.split(String.fromCharCode(m)).join(color)
  }
  var uncolor = npm.color ? '\u001B[0m' : ''
  return line.split('\u0000').join(uncolor)
}

function getMaxWidth () {
  var cols
  try {
    var tty = require('tty')
    var stdout = process.stdout
    cols = !tty.isatty(stdout.fd) ? Infinity : process.stdout.getWindowSize()[0]
    cols = (cols === 0) ? Infinity : cols
  } catch (ex) { cols = Infinity }
  return cols
}

function trimToMaxWidth (str) {
  var maxWidth = getMaxWidth()
  return str.split('\n').map(function (line) {
    return line.slice(0, maxWidth)
  }).join('\n')
}

function highlightSearchTerms (str, terms) {
  terms.forEach(function (arg, i) {
    str = addColorMarker(str, arg, i)
  })

  return colorize(str).trim()
}
