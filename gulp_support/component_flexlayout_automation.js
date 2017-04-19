var fs = require("fs");
var path = require("path");

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

function nameOfClass(string){

};

function findSuffix(suffix){
  return function(string){
    return string.includes(suffix) ? string : void 0;
  };
};

const findItemClass = findSuffix("item");
const findContainerClass = findSuffix("container");

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

}; // TESTED AND WORKS.

function parseClassNamesIntoArray(string){
  return retrieveClassString(string).split(String.fromCharCode(32));
}; //TESTED AND WORKS

// function searchClassNameArrayForContainer(string){
//   return parseClassNamesIntoArray.includes(`-container`);
// }; //UNTESTED

// function searchClassNameArrayForItem(string){
//   return parseClassNamesIntoArray.includes(`${nameOfComponent(file)}-item`);
// }; //UNTESTED

function findFirstClosingAngleBracket(string){
  return string.search(/>/);
}; // UNTESTED

function findWritePosition(string){
  return (findFirstClosingAngleBracket(string) - 1);
}; // UNTESTED

function kebabCaseToCamelCase(string){
  return string.replace(/-([a-z])/g, function(s, captured){
      return captured.toUpperCase();
    });
  }; // TESTED AND WORKS

function camelCaseToKebabCase(string){
  return string.replace(/([A-Z])/g, function(s, captured){
        return "-"+captured.toLowerCase();
      });
    }; // TESTED AND WORKS

function appendContainerDirectives(string){
  // THIS IS ALL WRONG. NAME CANNOT BE DERIVED FROM FILE. MULTIPLED ELEMENTS WITHIN A TEMPLATE.
  return containerDirectivesString =
    `
    ${string.slice(0,findFirstClosingAngleBracket(string))}
    [fxLayout]=
    [fxLayoutAlign]=
    [fxLayoutWrap]=
    [fxLayoutGap]= >
    `
}; // NEED TO INCORPORATE findWritePosition

function appendItemDirectives(string){
  // THIS IS ALL WRONG. NAME CANNOT BE DERIVED FROM FILE. MULTIPLED ELEMENTS WITHIN A TEMPLATE.
  return itemDirectiveString =
    `
    ${string.slice(0,findFirstClosingAngleBracket(string))}
    [fxFlex]=
    [fxFlexOrder]=
    [fxFlexOffset]=
    [fxFlexAlign]=
    [fxFlexFill]= >
    `
}; // NEED TO INCORPORATE findWritePosition

function lineStartsHTMLElement(string){};

function classifyingFunction(string){


  if(findContainerClass(string) && findItemClass(string)){
    return "container item"

  }
  else if (findContainerClass(string)){
    return "container"
  }
  else if (findItemClass(string)){
    return "item"
  }
  else {
    return "none"

  }

};

function containerItemString(string){
  return itemString(containerString(string));
};

function containerString(string){

};

function itemString(string){

};

function theMagic(string){



  switch(classifyingFunction(string)){

    case 'container item':

      return appendItemDirectives(appendContainerDirectives(string));
      break;

    case 'container':

      return appendContainerDirectives(string);
      break;

    case 'item':

      return appendItemDirectives(string);
      break;

    case 'none':

      return string;
      break;

    default:
      console.log(`You missed a case somehow. Classification: ${classifyingFunction(string)} String: ${string}`);
      throw Error;
      break
  }
};


exports.add = function(file) {
  console.log(`add html`);
};

exports.change = function(file) {

  const route = "./gulp_support/testing.component.html";
  fs.readFile( route , 'ascii', (err, data)=>{
    if (err) throw err;
    else {
      let lines = data.split('\n');
      //let newLines = lines.map(x => theMagic(x));
      // let updated = newLines.map(x => x.concat('\n')).reduce(( x , y ) => x + y );
      let updated = lines
                    .map(x => theMagic(x))
                    .reduce(( x , y ) => x + y );
        fs.writeFile( route, updated, (err) => {
          if (err) throw err;
        });
    };
});


};

exports.unlink = function(file) {
  console.log("unlink html");
}
