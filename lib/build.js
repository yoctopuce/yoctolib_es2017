// This script is intended to be used from the package root (lib directory), from npm scripts.
//
// Usage:
//
//   npm run build
//   => bump version number to next pre-release suffix and update index.js
//
//   npm run build -- 1.10.21818
//   => set official version number and update index.js
//
"use strict";
let fs = require('fs');
let resolve = require('path').resolve;
let semver = require('semver');

function makeIndex()
{
  // generate a source file (async/await) index that includes support for all Yoctopuce functions
  let index = 'require(\'./yocto_api.js\');\n';
  fs.readdirSync(__dirname).forEach(function (mod) {
    if (mod.length > 3 && mod.slice(-3) == '.js' && mod != 'build.js' && mod != 'index.js' && mod != 'yocto_api.js') {
      index += 'require(\'./' + mod.slice(0, -3) + '\');\n';
    }
  });
  fs.writeFileSync("index.js", index, 'utf-8');
  console.log('source index file has been updated')
}

function setVersion(str_newver)
{
  // update version number is package.json
  let json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  let newver = '?';
  console.log('Was at version ' + json.version);
  if (str_newver) {
    // argument is new version number
    newver = semver.clean(str_newver);
    if (!newver) {
      console.log('Invalid version number: ' + process.argv[2]);
      process.exit(1);
    }
  } else {
    // bump local revision number
    newver = semver.inc(json.version, 'prerelease', 'dev');
  }
  console.log('Now at version ' + newver);
  json.version = newver;
  fs.writeFileSync("package.json", JSON.stringify(json, null, 2), 'utf-8');

  // update version number in yocto_api.js
  let pattern = '/* version number patched automatically */';
  let jsFile = fs.readFileSync('yocto_api.js');
  let pos = jsFile.indexOf(pattern);
  if(pos < 0) {
    console.log('*** Warning, cannot patch yocto_api.js, pattern not found !');
  } else {
    pos += pattern.length;
    let endMark = jsFile.indexOf(';', pos);
    let patch = "'" + newver + "'";
    let res = new Buffer.alloc(pos + patch.length + jsFile.length-endMark);
    jsFile.copy(res, 0, 0, pos);
    res.write(patch, pos);
    jsFile.copy(res, pos + patch.length, endMark);
    fs.writeFileSync('yocto_api.js', res);
  }

  // update version number in example configuration files
  [ 'example_html', 'example_nodejs', 'hidden'].forEach(function(dirname) {
    let lib = resolve(__dirname, '../'+dirname);
    fs.readdirSync(lib).forEach(function (exname) {
      let exdir = resolve(lib, exname);
      // patch package.json
      json = false;
      try {
        json = JSON.parse(fs.readFileSync(exdir + '/package.json', 'utf8'));
      } catch (err) {
        //console.log('No file "'+exdir+'/package.json"');
      }
      if (json && json.dependencies) {
        json.dependencies['yoctolib-es2017'] = '^'+newver;
        if(json.jspm) {
          delete json.jspm;
        }
        if(json.devDependencies) {
          delete json.devDependencies;
        }
        fs.writeFileSync(exdir+'/package.json', JSON.stringify(json, null, 2), 'utf-8');
      }
    });
  });
}

let args = process.argv.slice(2);
if(args.length == 0) {
  console.log("argument expected: build")
} else {
  switch(args[0]) {
  case "build":
    setVersion(args[1]);
    makeIndex();
    break;
  }
}