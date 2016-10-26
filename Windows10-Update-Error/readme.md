# update error : 

> Error: Refusing to install npm as a dependency of itself


npm update npm@latest


```log
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

``` 

## makedown input select

```code
#### I'm opening this issue because:

  - [ ] npm is crashing.
  - [ ] npm is producing an incorrect install.
  - [ ] npm is doing something I don't understand.
  - [ ] Other (_see below for feature requests_):

#### What's going wrong?

#### How can the CLI team reproduce the problem?

<!--
    Please a complete description of how to reproduce the problem.
    Include a gist of your npm-debug.log file.
    If you've never used gist.github.com, start here:
      https://github.com/EmmaRamirez/how-to-submit-your-npm-debug-log
-->

### supporting information:

 - `npm -v` prints:
 - `node -v` prints:
 - `npm config get registry` prints:
 - Windows, OS X/macOS, or Linux?:
 - Network issues:
   - Geographic location where npm was run:
   - [ ] I use a proxy to connect to the npm registry.
   - [ ] I use a proxy to connect to the web.
   - [ ] I use a proxy when downloading Git repos.
   - [ ] I access the npm registry via a VPN
   - [ ] I don't use a proxy, but have limited or unreliable internet access.
 - Container:
   - [ ] I develop using Vagrant on Windows.
   - [ ] I develop using Vagrant on OS X or Linux.
   - [ ] I develop / deploy using Docker.
   - [ ] I deploy to a PaaS (Triton, Heroku).

<!--
    Thank you for contributing to npm! Please review this checklist
    before submitting your issue.

    - Please check if there's a solution in the troubleshooting wiki:
      https://github.com/npm/npm/wiki/Troubleshooting

    - Also ensure that your new issue conforms to npm's contribution guidelines:
      https://github.com/npm/npm/wiki/Contributing-Guidelines

    - Participation in this open source project is subject to the npm Code of Conduct:
      https://www.npmjs.com/policies/conduct

    For feature requests, delete the above and uncomment the section following this one. But first, review the existing feature requests
    and make sure there isn't one that already describes the feature
    you'd like to see added:
      https://github.com/npm/npm/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+label%3Aalready-looked-at
-->

<!--

#### What's the feature?

#### What problem is the feature intended to solve?

#### Is the absence of this feature blocking you or your team? If so, how?

#### Is this feature similar to an existing feature in another tool?

#### Is this a feature you're prepared to implement, with support from the npm CLI team?

-->
``` 
## demo

#### I'm opening this issue because:

  - [ ] npm is crashing.
  - [ ] npm is producing an incorrect install.
  - [ ] npm is doing something I don't understand.
  - [ ] Other (_see below for feature requests_):

#### What's going wrong?

#### How can the CLI team reproduce the problem?

<!--
    Please a complete description of how to reproduce the problem.
    Include a gist of your npm-debug.log file.
    If you've never used gist.github.com, start here:
      https://github.com/EmmaRamirez/how-to-submit-your-npm-debug-log
-->

### supporting information:

 - `npm -v` prints:
 - `node -v` prints:
 - `npm config get registry` prints:
 - Windows, OS X/macOS, or Linux?:
 - Network issues:
   - Geographic location where npm was run:
   - [ ] I use a proxy to connect to the npm registry.
   - [ ] I use a proxy to connect to the web.
   - [ ] I use a proxy when downloading Git repos.
   - [ ] I access the npm registry via a VPN
   - [ ] I don't use a proxy, but have limited or unreliable internet access.
 - Container:
   - [ ] I develop using Vagrant on Windows.
   - [ ] I develop using Vagrant on OS X or Linux.
   - [ ] I develop / deploy using Docker.
   - [ ] I deploy to a PaaS (Triton, Heroku).

<!--
    Thank you for contributing to npm! Please review this checklist
    before submitting your issue.

    - Please check if there's a solution in the troubleshooting wiki:
      https://github.com/npm/npm/wiki/Troubleshooting

    - Also ensure that your new issue conforms to npm's contribution guidelines:
      https://github.com/npm/npm/wiki/Contributing-Guidelines

    - Participation in this open source project is subject to the npm Code of Conduct:
      https://www.npmjs.com/policies/conduct

    For feature requests, delete the above and uncomment the section following this one. But first, review the existing feature requests
    and make sure there isn't one that already describes the feature
    you'd like to see added:
      https://github.com/npm/npm/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+label%3Aalready-looked-at
-->

<!--

#### What's the feature?

#### What problem is the feature intended to solve?

#### Is the absence of this feature blocking you or your team? If so, how?

#### Is this feature similar to an existing feature in another tool?

#### Is this a feature you're prepared to implement, with support from the npm CLI team?

-->


======
======



# error: 不好使(not useful)

$ npm install npm -g

$ npm install npm@latest -g


***************************************************************************************
> https://github.com/npm/npm/issues/9695

# --force install 超级好使！(super power)

$ npm i npm -g -f
$ npm install npm -g -f

***************************************************************************************



