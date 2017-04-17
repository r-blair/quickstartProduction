# quickstartProduction

## What this is:

Based off of the Angular seed project.

A good starting point for any Angular project, AOT compilation ready.

## What it's built with:

* [Angular](https://angular.io/)
* [@angular/flex-layout](https://github.com/angular/flex-layout)
* [@angular/material2](https://material.angular.io/)
* [Angular-cli](https://github.com/angular/angular-cli)
* [Angular quickstart seed](https://github.com/angular/quickstart)
* [System.js](https://github.com/systemjs/systemjs)
* [Rollup.js](http://rollupjs.org/)
* [Node.js](https://nodejs.org/en/)
* [Gulp.js](https://github.com/gulpjs/gulp)

## Rationale

While the ng-cli is capable of generating its own web-pack based projects the Angular quickstart seed wasn't really needed I found ng-cli to be hiding too much of the implementation and I wasn't able to get it to do exactly what I wanted.

However now that I'm looking at AOT compilation and lazy-loading I'm running into problems with System.js/Rollup.js as [Rollup doesn't have codesplitting](https://github.com/rollup/rollup/issues/372). So I'd recommend going with the web-pack ng-cli and just hacking on the ng-cli if you're determined enough to customize it.

I'm still using ng-cli to generate components, modules, services, etc. as it's still convenient. Essentially [this](https://github.com/angular/angular-cli/wiki/stories-moving-out-of-the-cli).

## Workflow:

* Have gulp w:comp running, upon generating a component it will generate the files to support @angular/material themeing.
* Have gulp w:html running, when you lay-out the component template it will parse the class-names and generate the required properties and class-names in the scss and component file. (NOT YET IMPLEMENTED)
* Use ng g component *component name* to start to layout the project.
* Goto the template file of the component, scaffold it out, give it a class-name following this syntax:  **Must use Emmet to scaffold your template**

* Use the command "npm run build:aot" to build a fully optimized single file. (Issues reguarding lazy loaded modules exist here, I haven't had the chance to dive into it yet.)
* use the command "npm start" for production. Uses JIT compilation rather than AOT.

## Noteworthy implementation details:

* custom scripts located in gulp_support/ to help with the large amount of files generated and boilerplate.

## Work to be done:

Deciding on an intelligent syntax so I can use the custom gulp scripts to automate the wiring up of the components with flex-layout.

Alot of clean-up to be done.
