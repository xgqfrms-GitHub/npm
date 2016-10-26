# DOC-Touch 


##

https://www.npmjs.com/package/livereload

https://www.npmjs.com/package/gulp-livereload

https://github.com/vohof/gulp-livereload



``js
var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');
 
gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});
 
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('less/*.less', ['less']);
});

``` 

```js
var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('html', function() {
    livereload.listen();
    gulp.watch('src/*.html', function(file){
        console.log(file);
        gulp.src(file.path)
        .pipe(livereload());
    });
});

gulp.task('sass',function(){
    var config = {};
    if (env === 'development') {
        config.sourceComments = 'map';
    } 
    if(env === 'production'){
        config.outputStyle = 'compressed';
    }
    return gulp.src('src/sass/*.scss')
        // .pipe(sass({ sourceComments: 'map'}))
        .pipe(sass(config))
        .pipe(gulp.dest(outputDir + '/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('sass/*.scss', ['scss']);
});

gulp.task('default',['watch'],['html']);
``` 


···json
{
  "name": "Gulp-demo",
  "version": "1.0.1",
  "description": "This is a Gulp project created by xgqfrms & webgeeker 2016.10",
  "main": "gulpfile.js",
  "scripts": {
    "auto": "gulp"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/xgqfrms/Gulp"
  },
  "keywords": [
    "xgqfrms",
    "webgeeker",
    "js",
    "node",
    "ES6",
    "gulp",
    "..."
  ],
  "author": "xgqfrms",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/xgqfrms/Gulp"
  },
  "homepage": "https://github.com/xgqfrms/Gulp",
  "dependencies": {
    "gulp": "^3.9.1",
  },
  "devDependencies": {
    "gulp-browserify": "^0.5.1",
    "gulp-connect": "^5.0.0",
	"gulp-livereload": "^3.8.1"
  }
}

``` 

## 


https://www.browsersync.io/

https://www.browsersync.io/docs/gulp




$ npm install -g browser-sync

$ npm install browser-sync gulp --save-dev


cd 项目路径的目录下， 执行

$ browser-sync start --server --files "css/*.css"

监控所有文件
$ browser-sync start --server --files "**"


UI : 3001

Server: 3000



https://www.npmjs.com/search?q=browser%20sync%20plugin


https://www.browsersync.io/docs/command-line

$ browser-sync start

--server, -s	Run a Local server (uses your cwd as the web root)
--serveStatic, --ss	Directories to serve static files from
--port	Specify a port to use
--proxy, -p	Proxy an existing server
--ws	Proxy mode only - enable websocket proxying
--browser, -b	Choose which browser should be auto-opened
--files, -f	File paths to watch
--index	Specify which file should be used as the index page
--plugins	Load Browsersync plugins
--extensions	Specify file extension fallbacks
--startPath	Specify the start path for the opened browser
--https	Enable SSL for local development
--directory	Show a directory listing for the server
--xip	Use xip.io domain routing
--tunnel	Use a public URL
--open	Choose which URL is auto-opened (local, external or tunnel), or provide a url
--cors	Add Access Control headers to every request
--config, -c	Specify a path to a configuration file
--host	Specify a hostname to use
--logLevel	Set the logger output level (silent, info or debug)
--reload-delay	Time in milliseconds to delay the reload event following file changes
--reload-debounce	Restrict the frequency in which browser:reload events can be emitted to connected clients
--ui-port	Specify a port for the UI to use
--no-notify	Disable the notify element in browsers
--no-open	Don't open a new browser window
--no-online	Force offline usage
--no-ui	Don't start the user interface
--no-ghost-mode	Disable Ghost Mode
--no-inject-changes	Reload on every file change
--no-reload-on-restart	Don't auto-reload all browsers following a restart




$ browser-sync recipe

--output, -o	Specify an output directory


$ browser-sync reload

--files, -f	File paths to reload
--port, -p	Target a running instance by port number
--url, -u	Provide the full the url to the running Browsersync instance


$ browser-sync init

$ browser-sync init


# error: 不好使(not useful)

$ npm install npm -g

$ npm install npm@latest -g


***************************************************************************************
> https://github.com/npm/npm/issues/9695

# --force install 超级好使！(super power)

$ npm i npm -g -f
$ npm install npm -g -f

***************************************************************************************

 
 
 
 
 
 
 
 
 
 
 

 
 0 info it worked if it ends with ok
1 verbose cli [ 'H:\\Program Files\\nodejs\\node.exe',
1 verbose cli   'C:\\Users\\xray\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js',
1 verbose cli   'install',
1 verbose cli   'npm@latest',
1 verbose cli   '-g' ]
2 info using npm@3.3.3
3 info using node@v6.9.1
4 silly loadCurrentTree Starting
5 silly install loadCurrentTree
6 silly install readGlobalPackageData
7 silly fetchPackageMetaData npm@latest
8 silly fetchNamedPackageData npm
9 silly mapToRegistry name npm
10 silly mapToRegistry using default registry
11 silly mapToRegistry registry https://registry.npmjs.org/
12 silly mapToRegistry uri https://registry.npmjs.org/npm
13 verbose request uri https://registry.npmjs.org/npm
14 verbose request no auth needed
15 info attempt registry request try #1 at 04:47:58
16 verbose request using bearer token for auth
17 verbose request id eec47a5afa3440d0
18 verbose etag "7XKEYLTC8BNUYGDI9E2UFM839"
19 http request GET https://registry.npmjs.org/npm
20 http 304 https://registry.npmjs.org/npm
21 silly get cb [ 304,
21 silly get   { 'cache-control': 'max-age=300',
21 silly get     'accept-ranges': 'bytes',
21 silly get     date: 'Wed, 26 Oct 2016 20:48:00 GMT',
21 silly get     via: '1.1 varnish',
21 silly get     connection: 'keep-alive',
21 silly get     'x-served-by': 'cache-hkg6823-HKG',
21 silly get     'x-cache': 'MISS',
21 silly get     'x-cache-hits': '0',
21 silly get     'x-timer': 'S1477514879.503329,VS0,VE957',
21 silly get     vary: 'Accept-Encoding' } ]
22 verbose etag https://registry.npmjs.org/npm from cache
23 verbose get saving npm to C:\Users\xray\AppData\Roaming\npm-cache\registry.npmjs.org\npm\.cache.json
24 silly install normalizeTree
25 silly loadCurrentTree Finishing
26 silly loadIdealTree Starting
27 silly install loadIdealTree
28 silly cloneCurrentTree Starting
29 silly install cloneCurrentTreeToIdealTree
30 silly cloneCurrentTree Finishing
31 silly loadShrinkwrap Starting
32 silly install loadShrinkwrap
33 silly loadShrinkwrap Finishing
34 silly loadAllDepsIntoIdealTree Starting
35 silly install loadAllDepsIntoIdealTree
36 silly rollbackFailedOptional Starting
37 silly rollbackFailedOptional Finishing
38 silly runTopLevelLifecycles Starting
39 silly runTopLevelLifecycles Finishing
40 silly install printInstalled
41 verbose stack Error: Refusing to install npm as a dependency of itself
41 verbose stack     at checkSelf (C:\Users\xray\AppData\Roaming\npm\node_modules\npm\lib\install\validate-args.js:40:14)
41 verbose stack     at Array.<anonymous> (C:\Users\xray\AppData\Roaming\npm\node_modules\npm\node_modules\slide\lib\bind-actor.js:15:8)
41 verbose stack     at LOOP (C:\Users\xray\AppData\Roaming\npm\node_modules\npm\node_modules\slide\lib\chain.js:15:14)
41 verbose stack     at chain (C:\Users\xray\AppData\Roaming\npm\node_modules\npm\node_modules\slide\lib\chain.js:20:5)
41 verbose stack     at C:\Users\xray\AppData\Roaming\npm\node_modules\npm\lib\install\validate-args.js:15:5
41 verbose stack     at C:\Users\xray\AppData\Roaming\npm\node_modules\npm\node_modules\slide\lib\async-map.js:52:35
41 verbose stack     at Array.forEach (native)
41 verbose stack     at C:\Users\xray\AppData\Roaming\npm\node_modules\npm\node_modules\slide\lib\async-map.js:52:11
41 verbose stack     at Array.forEach (native)
41 verbose stack     at asyncMap (C:\Users\xray\AppData\Roaming\npm\node_modules\npm\node_modules\slide\lib\async-map.js:51:8)
42 verbose cwd C:\WINDOWS\system32
43 error Windows_NT 10.0.14393
44 error argv "H:\\Program Files\\nodejs\\node.exe" "C:\\Users\\xray\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js" "install" "npm@latest" "-g"
45 error node v6.9.1
46 error npm  v3.3.3
47 error code ENOSELF
48 error Refusing to install npm as a dependency of itself
49 error If you need help, you may report this error at:
49 error     <https://github.com/npm/npm/issues>
50 verbose exit [ 1, true ]



https://github.com/felixrieseberg/npm-windows-upgrade

https://github.com/npm/npm/wiki/Troubleshooting#try-the-latest-stable-version-of-npm

https://github.com/npm/npm/issues/9695


https://github.com/npm/npm/issues/14433
