# production_quickstart

## things that are not built together

build:aot  (is currently done without a watcher)
build (for jit)
scss compilation

## efficiency issues

generating new components with the current setup requires alot of manual setup (which in turn leaves alot of room for human error)

current generation leaves

```plain
<root>
<scss>
<src>
<app>
_component-theme.scss
<component name>
  <component name>.component.ts|html|scss

As part of our styling procedure we're using 2 scss partials

_<component name>.component-base.scss
_<component name>.component-theme.scss

where -theme is a mixin that gets wired through _component-theme.scss for faster design change
and -base is importing in app level styles

gulpfile needs to ignore the bootstrap directory while compiling scss

ng g component <path>/<component name>

will generate a directory at src/app/<path>/<component name> containing <component name>.component.ts|html|scss

we can use a gulp directory watcher to watch for the addition of src/app/<path>/<component name>/<component name>.component.scss
and then create the 2 partials and wire it up.

Wiring that needs to be done: -theme needs to be wired through the mixin _component-theme

how to implement this:

gulp watcher for components (adding a component, moving a component and deleting a component should all be dealt with accordingly)

Upon adding a component, create the 2 files


```





## build tools

vscode
gulp
npm

## config files

package.json

.editorconfig
.gitignore

systemjs-angular-loader.js
systemjs.config.extras.js
systemjs.config.js
systemjs.config.server.js

.angular-cli.json

bs-config.e2e.json
bs-config.json
karma.conf.js

rollup-config.js
tsconfig.json
tsconfig-aot.json


## clean up

Excessive amounts of systemjs config files


## Current things that greatly displease me

With this build system we cannot do AOT compilation and lazy-load modules as rollup does not support code splitting. (Those fuckers.)
