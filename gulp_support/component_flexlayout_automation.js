var fs = require("fs");
var path = require("path");
//var vinyl = require("vinyl");

// STRINGS AND OBJECTS FOR TESTING.

// const testHtmlSegment = "<div class=\"lerp gerp berp chirp tits-container tits-item\">";

// const testVinyl = new vinyl({
//   cwd: process.cwd(),
//   base: __dirname,
//   path: __filename,
//   contents: null
// });

// console.log(`${testVinyl.cwd} \n ${testVinyl.base} \n ${testVinyl.path}`);


// FUNCTIONS
// Gradually building up complexity by composition of basic functions.
function templatePath(file){
  return file.path;
}; // TESTED AND WORKS.

function componentPath(file){
  return templatePath(file).replace(".html", ".ts");
}; // TESTED AND WORKS

function stylePath(file){
  return templatePath(file).replace(".html", ".scss");
}; // TESTED AND WORKS

function nameOfComponent(file){
  return path.parse(file.path).name.slice(0,-10);
}; // TESTED AND WORKS

function htmlLineHasClass(string){
  return string.includes("class=");
}; // TESTED AND WORKS


function retrieveClassString(string){

  // CURRENT IMPLEMENTATION ASSUMES ALOT AND ISN'T PARTICULARLY GOOD CODE...
  // If you scaffold with Emmet and drop the closing tag to a new line, it will work as intended, otherwise... ???
  // Might spend more time on this in the future, but it's also a worthwhile expenditure of time to learn Emmet, so...

  let classStringStart = string.search(/class/) + 7;
  let classStringEnd = string.length - 2;

  return string.slice(classStringStart, classStringEnd);

}; // Terrible solution holding everything together. TESTED AND WORKS

function parseClassNamesIntoArray(string){
  return retrieveClassString(string).split(String.fromCharCode(32)); //CharCode 32 is space.
}; //TESTED AND WORKS

function searchClassNameArrayForContainer(string, file){
  return parseClassNamesIntoArray.includes(`${nameOfComponent(file)}-container`);
}; //UNTESTED

function searchClassNameArrayForItem(string, file){
  return parseClassNamesIntoArray.includes(`${nameOfComponent(file)}-item`);
}; //UNTESTED

function findFirstClosingAngleBracket(string){
  return string.search(/>/);
}; // UNTESTED

function findWritePosition(string){
  return (findFirstClosingAngleBracket(string) - 1);
}; // UNTESTED

function kebabCaseToCamelCase(string){
  return string.replace(/-([a-z])/g, function(s, group1){
      return group1.toUpperCase();
    });
  }; // TESTED AND WORKS

function camelCaseToKebabCase(string){
  return string.replace(/([A-Z])/g, function(s, group1){
        return "-"+group1.toLowerCase();
      });
    }; // TESTED AND WORKS

function appendContainerDirectives(string, file){
  // THIS IS ALL WRONG. NAME CANNOT BE DERIVED FROM FILE. MULTIPLED ELEMENTS WITHIN A TEMPLATE.
  // return containerDirectivesString =
  //   `
  //   [fxLayout]=\"${nameOfComponent(file)}Layout\"\r\n
  //   [fxLayoutAlign]=\"${nameOfComponent(file)}LayoutAlign\"\r\n
  //   [fxLayoutWrap]=\"${nameOfComponent(file)}LayoutWrap\"\r\n
  //   [fxLayoutGap]=\"${nameOfComponent(file)}LayoutGap\"\r\n
  //   `
}; // NEED TO INCORPORATE findWritePosition

function appendItemDirectives(string, file){
  // THIS IS ALL WRONG. NAME CANNOT BE DERIVED FROM FILE. MULTIPLED ELEMENTS WITHIN A TEMPLATE.
  // return itemDirectiveString =
  //   `
  //   [fxFlex]=\"${nameOfComponent(file)}Flex\"\r\n
  //   [fxFlexOrder]=\"${nameOfComponent(file)}FlexOrder\"\r\n
  //   [fxFlexOffset]=\"${nameOfComponent(file)}FlexOffset\"\r\n
  //   [fxFlexAlign]=\"${nameOfComponent(file)}FlexAlign\"\r\n
  //   [fxFlexFill]=\"${nameOfComponent(file)}FlexFill\"\r\n
  //   `
}; // NEED TO INCORPORATE findWritePosition

function lineStartsHTMLElement(string){

};

console.log(kebabCaseToCamelCase("name-container-lame-derp"));
console.log(camelCaseToKebabCase(kebabCaseToCamelCase("name-container-lame-derp")));

// If name-container -> add container properties as nameContainerProperty
// If name-item -> add item properties as nameItemProperty

// DIRECTIVES FOR DOM CONTAINERS
// fxLayout	row | column | row-reverse | column-reverse
// fxLayoutAlign	start|center|end|space-around|space-between start|center|end|stretch
// fxLayoutWrap	"" | wrap | none | nowrap | reverse
// fxLayoutGap	%, px, vw, vh

/*
[fxLayout]=""
[fxLayoutAlign]=""
[fxLayoutWrap]=""
[fxLayoutGap]=""
*/

// DIRECTIVES FOR DOM ELEMENTS
// fxFlex	"" , px , %, vw, vh, " ",
// fxFlexOrder	int
// fxFlexOffset	%, px, vw, vh
// fxFlexAlign	start|baseline|center|end
// fxFlexFill

/*
[fxFlex]=""
[fxFlexOrder]=""
[fxFlexOffset]=""
[fxFlexAlign]=""
[fxFlexFill]=""
*/

// BOTH CONTAINERS AND ELEMENTS
// fxHide	TRUE, FALSE, 0, ""
// fxShow	TRUE, FALSE, 0, ""
// ngClass	@see ngClass
// ngStyle	@see ngStyle

/*
[fxHide]=""
[fxShow]=""
[ngClass]=""
[ngStyle]=""
*/

exports.add = function(file) {
  console.log(`add html`);
};

exports.change = function(file) {
  console.log("change html");
  // fs.readFile( templatePath(file) , 'utf8', ( err , data ) => {

  //     let lines = data.split('\n'); // each line of the template file.
  //     // Find class strings. HAS CLASS STRING OR DOESN'T HAVE CLASS STRING.
  //     let classStrings = [].push()
  //     /*

  //     CLASS STRING FUNCTIONS

  //     HAS CLASS STRING ->
  //       IS CONTAINER && IS ITEM ->
  //         Add container directives and add item directives
  //       ISNT CONTAINER && ISNT ITEM ->
  //         Do nothing
  //       IS CONTAINER && ISN'T ITEM ->
  //         Add container directives only
  //       ISNT CONTAINER && IS ITEM ->
  //         Add item directives only

  //     */



  //     let updated = lines.map(x => x.concat('\n')).reduce(( x , y ) => x + y );
  //       fs.writeFile( route_to_themesList, updated, (err) => {
  //           if (err) throw err;
  //         });
};

exports.unlink = function(file) {
  console.log("unlink html");
}
