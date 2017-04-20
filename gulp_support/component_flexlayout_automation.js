var fs = require("fs");
var path = require("path");

const testerString = "<div class=\"herp nav-item lerp derp\" >";

function templatePath(file){
  return file.path;
};

function componentPath(file){
  return templatePath(file).replace(".html", ".ts");
};

function stylePath(file){
  return templatePath(file).replace(".html", ".scss");
};

function nameOfComponent(file){
  return path.parse(file.path).name.slice(0,-10);
};

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
};

function retrieveClassString(string){

  // CURRENT IMPLEMENTATION ASSUMES ALOT AND ISN'T PARTICULARLY GOOD CODE...
  // If you scaffold with Emmet and drop the closing tag to a new line, it will work as intended, otherwise... ???
  // Might spend more time on this in the future, but it's also a worthwhile expenditure of time to learn Emmet, so...

  let classStringStart = string.search(/class/) + 7;
  let classStringEnd = string.length - 2;

  return string.slice(classStringStart, classStringEnd);

};

function parseClassNamesIntoArray(string){
  return retrieveClassString(string).split(String.fromCharCode(32));
};

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
  };

function camelCaseToKebabCase(string){
  return string.replace(/([A-Z])/g, function(s, captured){
        return "-"+captured.toLowerCase();
      });
    }; // unused

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

function nameOfElementFindingFunction(stringInArray){
  return (findContainerClass(stringInArray) || findItemClass(stringInArray));
};





function nameOfElement(string){
  let x =  parseClassNamesIntoArray(string).find(nameOfElementFindingFunction); //name of the element...
  console.log(x);

  if(findContainerClass(x)){
    let y = x.length - 10;  // removes "-container"
    return x.slice( 0 , y );
  }
  else if (findItemClass(x)){
    let y = x.length - 5; // removes "-item"
    return x.slice( 0 , y );

  }
  else{
    console.log(`Something has gone wrong in nameOfElement. ${args}`);
  }

};

function theMagic(string){

  switch(classifyingFunction(string)){
    case 'container item':

      return appendItemDirectives(appendContainerDirectives(string, nameOfElement(string)), nameOfElement(string));
    case 'container':

      return appendContainerDirectives(string, nameOfElement(string));
    case 'item':

      return appendItemDirectives(string, nameOfElement(string));
    case 'none':

      return string;
    default:
      console.log(`You missed a case somehow. Classification: ${classifyingFunction(string)} String: ${string}`);
      throw Error;
  }
};


function appendContainerDirectives(string, name){
  return containerDirectivesString =
    `
    ${string.slice(0,findFirstClosingAngleBracket(string))}
    \t[fxLayout]=\"${kebabCaseToCamelCase(name)}Layout\"
    \t[fxLayoutAlign]=\"${kebabCaseToCamelCase(name)}LayoutAlign\"
    \t[fxLayoutWrap]=\"${kebabCaseToCamelCase(name)}LayoutWrap\"
    \t[fxLayoutGap]=\"${kebabCaseToCamelCase(name)}LayoutGap\"
    >
    `
  };

function appendItemDirectives(string, name){
  return itemDirectiveString =
    `
    ${string.slice(0,findFirstClosingAngleBracket(string))}
    \t[fxFlex]=\"${kebabCaseToCamelCase(name)}Flex\"
    \t[fxFlexOrder]=\"${kebabCaseToCamelCase(name)}FlexOrder\"
    \t[fxFlexOffset]=\"${kebabCaseToCamelCase(name)}FlexOffset\"
    \t[fxFlexAlign]=\"${kebabCaseToCamelCase(name)}FlexAlign\"
    \t[fxFlexFill]=\"${kebabCaseToCamelCase(name)}FlexFill\"
    >
    `
  };

exports.add = function(file) {
  console.log(`add html`);
};

exports.change = function(file) {

  const route = "./gulp_support/testing.component.html";

  fs.readFile( route , 'ascii', (err, data)=>{
    // To prevent overwritting work, we only want to run this once.
    if(data.includes("[fx")){
      return;
    }
    else{
    if (err) throw err;
    else {
      let lines = data.split('\n');
      let updated = lines.map(x => theMagic(x)).reduce(( x , y ) => x + y );
        fs.writeFile( route, updated, (err) => {
          if (err) throw err;
        });
    }
  };
});
};

exports.unlink = function(file) {
  console.log("unlink html");
}


