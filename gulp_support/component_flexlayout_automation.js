var fs = require("fs");
var path = require("path");

/*

Helper functions. The input to this script is a vinyl object representing the template, referenced as 'file'.

We will be needing a path to the component file.
We will be needing a path to the main scss file.

*/
function componentPath(file){
  return file.path.replace(".html", ".ts");
};

function scssPath(file){
  return file.path.replace(".html", ".scss");
};

function nameOfComponent(file){
  return path.parse(file.path).name.slice(0,-10);
}

function isKebabCase(file, string){
  let name = nameOfComponent(file);
}

function retrieveClassString(string){}
/*
Different types of cases used here:

In HTML class names kebab-case
In TS property names Pascal-case

 */


/**
 * On creation every template gets a container element.
 */
exports.add = function(file) {
  console.log(`add html`);

}

/**
 * On save parse markup
 */

exports.change = function(file) {
  console.log("change html");
}

exports.unlink = function(file) {
  console.log("unlink html");
}
