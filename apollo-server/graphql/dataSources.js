const fs = require('fs');
const path = require('path');
const probe = require('probe-image-size');
const robots = require('../database/robots.json');
const floors = require('../database/floors.json');

class ImageAPI {
  loadImages(){
    const dirPath = path.join(__dirname, './_temp');
    const res = fs.readdirSync(dirPath);
    return res.map(name => {
      const data = fs.readFileSync(path.join(dirPath, name));
      const imageData = probe.sync(data);
      return {
        ...imageData,
        data:data,
      };
    });
  }

  loadImage(src){
    const data = fs.readFileSync(src);
    const imageData = probe.sync(data);
    return {
      ...imageData,
      data:data,
    };
  }
}

module.exports = () => { 
  return {
    imageAPI: new ImageAPI(),
    robots,
    floors,
  };
}