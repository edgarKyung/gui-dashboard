const fs = require('fs');
const path = require('path');

const licenseList = {};

function getPathList(dirPath) {
  const childDirs = fs.readdirSync(dirPath);
  for (let childDir of childDirs) {
    const childDirPath = path.join(dirPath, childDir);
    if (fs.statSync(childDirPath).isDirectory()) {
      const packagePath = path.join(childDirPath, 'package.json');
      if (fs.existsSync(packagePath)) {
        getLicense(packagePath);
      }
      getPathList(childDirPath);
    }
  }
}

function getLicense(packagePath) {
  const data = JSON.parse(fs.readFileSync(packagePath).toString());
  if (data.license && data.license.type) {
    licenseList[data.license.type] = licenseList[data.license.type] || [];
    licenseList[data.license.type].push({ name: data.name, version: data.version });
    return;
  }
  licenseList[data.license] = licenseList[data.license] || [];
  licenseList[data.license].push({ name: data.name, version: data.version });
  if (data.license === 'MPL-2.0') {
    console.log(packagePath)
  }
}


getPathList('../node_modules');


for (let license in licenseList) {
  console.log(license, licenseList[license].length);
}




// for (let i = 0; i < a.length; i += 1)
// ... {
// ... const filepath = `./node_modules/${a[i]}/package.json`;
// ... const data = JSON.parse(fs.readFileSync(filepath).toString());
// ...gData[data.license] = gData[data.license] || [];
// ...gData