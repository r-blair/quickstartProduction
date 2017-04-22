var fs = require("fs");
var path = require("path");


function templatePath(file){
  return file.path;
};

function fromRootMQServicePath(){
  return path.join("src", "app", "_core", "services", "media-query.service.ts");
};

function relativeMQServicePath(file){
  let y = path.relative(componentPath(file), fromRootMQServicePath()).replace(/\\/g,'/').length -3;
  return path.relative(componentPath(file), fromRootMQServicePath()).replace(/\\/g,'/').slice(1, y)
};

function componentImports(file){
  return `import { Component, OnInit, OnDestroy } from '@angular/core';\nimport { Subscription } from 'rxjs/Subscription';\n\nimport { MQService } from '${relativeMQServicePath(file)}';`

};

function declarePropertiesInClass(string){
  return `  ${string}: string;`;
};

function initializePropertiesInClass(string){
  return `this.${string} = ""`;
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
  //console.log(x);

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

      return appendItemDirectivesHTML(appendContainerDirectivesHTML(string, nameOfElement(string)), nameOfElement(string));
    case 'container':

      return appendContainerDirectivesHTML(string, nameOfElement(string));
    case 'item':

      return appendItemDirectivesHTML(string, nameOfElement(string));
    case 'none':

      return string;
    default:
      console.log(`You missed a case somehow. Classification: ${classifyingFunction(string)} String: ${string}`);
      throw Error;
  }
};

function appendContainerDirectivesHTML(string, name){
  return containerDirectivesString =
  `${string.slice(0,findFirstClosingAngleBracket(string))}
  \t[fxLayout]=\"${kebabCaseToCamelCase(name)}Layout\"
  \t[fxLayoutAlign]=\"${kebabCaseToCamelCase(name)}LayoutAlign\"
  \t[fxLayoutWrap]=\"${kebabCaseToCamelCase(name)}LayoutWrap\"
  \t[fxLayoutGap]=\"${kebabCaseToCamelCase(name)}LayoutGap\"
  >`
  };

function appendItemDirectivesHTML(string, name){
  return itemDirectiveString =
  `${string.slice(0,findFirstClosingAngleBracket(string))}
  \t[fxFlex]=\"${kebabCaseToCamelCase(name)}Flex\"
  \t[fxFlexOrder]=\"${kebabCaseToCamelCase(name)}FlexOrder\"
  \t[fxFlexOffset]=\"${kebabCaseToCamelCase(name)}FlexOffset\"
  \t[fxFlexAlign]=\"${kebabCaseToCamelCase(name)}FlexAlign\"
  >`
  };

function getPropertyNames(string){
  let x = string.indexOf("\"") + 1;
  let y = string.length - 1;
  return string.substring(x,y);
};

function includesExportClass(string){
  return string.includes("export class");
};

function includesConstructor(string){
  return string.includes("constructor()");
};
exports.add = function(file) {
  console.log(`add html`);
};

exports.change = function(file) {

  const templateRoute = templatePath(file);
  const componentRoute = componentPath(file);



  // retrieves component file
  fs.readFile( templateRoute , 'ascii', (err, data) => {
    // To prevent overwritting work, we only want to run this once.
    if(data.includes("[fx")){ // this needs to be rethought
      console.log(`includes [fx`);
    }
    else{
      if (err){
        throw err;
      }
      else {

      let templateLines = data
                  .split('\n');

      let updatedTemplate = templateLines
                    .map(x => theMagic(x) /* a better function name would be great */)
                    .reduce(( x , y ) => x + y );

      let propertyNamesArray = updatedTemplate
                              .split('\n')
                              .filter(x => { return x.includes('[fx') })
                              .map(x => getPropertyNames(x));

      let declareProperties = propertyNamesArray
                                        .map(x => declarePropertiesInClass(x))
                                        .reduce(( x, y ) => x + "\n" + y );

      let initializeProperties = propertyNamesArray
                                          .map(x => initializePropertiesInClass(x))
                                          .reduce(( x, y ) => x + "\n" + y );

        fs.writeFile( templateRoute, updatedTemplate, (err) => {
          if (err) throw err;



          fs.readFile(componentRoute, 'ascii', (err, componentData) => {

            let componentLines = componentData.split('\n');
            componentLines.shift(); //removes the ng g component import statement.

            componentLines.splice( 0, 0, componentImports(file) );

            let exportClassIndex = componentLines.findIndex(includesExportClass);
            componentLines.splice(exportClassIndex + 1, 0, declareProperties);

            fs.readFile("./gulp_support/componentSnippet.txt", 'ascii', (err, snippetData) => {

              let constructorIndex = componentLines.findIndex(includesConstructor);
                  componentLines.splice(constructorIndex, 20, snippetData);

              let updatedComponent = componentLines.reduce((x,y)=>(x+ "\n" + y));

              fs.writeFile(componentRoute, updatedComponent, (err, data) => {
                });
              });
            });
          });
        };
      };
    });
  };

exports.unlink = function(file) {
  console.log("unlink html");
}


