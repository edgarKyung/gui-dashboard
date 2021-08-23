const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  try {
    const configPath = path.join(__dirname, '../mock/configure._.json');
    const configData = JSON.parse(fs.readFileSync(configPath));
    console.log('GET [/wall]', 'SUCCESS');
    return res.send(configData.wall || []);

  } catch (ex) {
    console.log('GET [/wall]', 'FAILED');
    return res.send('FAILED');
  }
});

router.post('/', function (req, res) {
  const configPath = path.join(__dirname, '../mock/configure._.json');
  let output = { wall: req.body.wall };
  try {
    const configData = JSON.parse(fs.readFileSync(configPath));
    configData.wall = req.body.wall;
    output = configData;
  } catch (ex) { }
  fs.writeFileSync(configPath, JSON.stringify(output, null, 2));
  console.log('POST [/wall]', 'SUCCESS');
  return res.send('SUCCESS');
});

module.exports = router;
