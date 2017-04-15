const fs = require("fs");
const path = require("path");

const route_to_themesList = path.join("./src", "app", "_component-theme.scss");
const route_to_scss = path.join("./src", "scss");

function ofMixin(strings){
    return strings.includes('@mixin');
};

function ofStylesUrl(strings){
  return strings.includes('styleUrls');
};

function themeInclude(file){
  return `    @include ${path.basename(file.path).slice(0,-15)}-theme($theme);\r`
};

function themeImport(file){
  let x = path.relative(route_to_themesList, themeFilePath(file));
  return `@import \'${"." + x.slice(2, this.length).replace(/\\/g,'/')}\';\r`;
};

function themeName(file){
  return path.parse(file.path).name.slice(0,-10);
};

function themeFilePath(file){
  return file.path.replace(".scss", "-theme.scss");
};

function baseFilePath(file){
  return file.path.replace(".scss", "-base.scss");
};

function componentRoute(file){
  return file.path.replace(".scss", ".ts");
};

function componentThemeImportStatement(file){
  return `@import \"${path.relative(themeFilePath(file), "./src/app/scss/material/core/theming/all-theme").replace(/\\/g,'/')}\";`;
};

function componentThemeMixinStatement(file){
  return `@mixin ${themeName(file)}-theme($theme) {`;
};

function componentBaseImportStatement(file){
  return `@import \"${themeName(file)}.component-base\"`
};

function baseVariableImport(file){
  const x = path.parse(path.relative(baseFilePath(file), path.join(route_to_scss, "_variables.scss")));
  return `@import \"${path.join(x.dir, x.name.slice(1, this.length)).slice(3, this.length).replace(/\\/g,'/')}\";`;
};

exports.add = function ( file ) {

    fs.readFile( route_to_themesList, 'utf8', ( err , data ) => {

      let lines = data.split('\n');
        lines.splice(lines.findIndex(ofMixin) + 1, 0, themeInclude(file));
        lines.splice(0, 0, themeImport(file));
      let updated = lines.map(x => x.concat('\n')).reduce(( x , y ) => x + y );
        fs.writeFile( route_to_themesList, updated, (err) => {
            if (err) throw err;
          });
    });

    fs.readFile("./gulp_support/theme.scss", "utf8", ( err , data ) => {

      let lines = data.split('\n');
        lines[0] = componentThemeImportStatement(file);
        lines[lines.findIndex(ofMixin)] = componentThemeMixinStatement(file);
      let updated = lines.map(x => x.concat('\n')).reduce(( x , y ) => x + y );
        fs.writeFile(themeFilePath(file), updated, (err) => {
            if (err) throw err;
          });
    });

    fs.readFile("./gulp_support/base.scss", "utf8", ( err , data ) => {

      let lines = data.split('\n');
        lines.push(baseVariableImport(file));
      let updated = lines.map(x => x.concat('\n')).reduce(( x , y ) => x + y );
        fs.writeFile(baseFilePath(file), updated, (err) => {
            if (err) throw err;
          });
    });

    fs.writeFile(file.path, `@import \"${path.parse(baseFilePath(file)).name + ".scss"}\";`);

    fs.readFile(componentRoute(file), "utf8", ( err , data ) => {
      console.log(componentRoute(file));
      let lines = data.split('\n');
        lines[lines.findIndex(ofStylesUrl)] = `   styleUrls: [\'./${path.parse(file.path).name + '.css'}\']`;
      let updated = lines.map(x => x.concat('\n')).reduce(( x , y ) => x + y );
        fs.writeFile(componentRoute(file), updated, (err) => {
            if (err) throw err;
          });
    });

};

exports.change = function ( file ) {
     console.log(2);
};

exports.unlink = function ( file ) {
    console.log(3);
};
