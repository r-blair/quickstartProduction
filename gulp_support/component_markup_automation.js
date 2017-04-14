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


/**
 * On creation every template gets a container element.
 */
exports.add = function(file) {

}

/**
 * On save parse markup
 */

exports.change = function(file) {

}

exports.unlink = function(file) {

}
