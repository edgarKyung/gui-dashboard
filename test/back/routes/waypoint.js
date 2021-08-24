const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  try {
    const configPath = path.join(__dirname, '../mock/configure._.json');
    const configData = JSON.parse(fs.readFileSync(configPath));
    console.log('GET [/waypoint]', 'SUCCESS');
    return res.send(configData.waypoint || []);

  } catch (ex) {
    console.log(ex);
    console.log('GET [/waypoint]', 'FAILED');
    return res.send('FAILED');
  }
});

router.post('/', function (req, res) {
  const configPath = path.join(__dirname, '../mock/configure._.json');
  console.log(req.body.waypoint);
  let output = { waypoint: req.body.waypoint };
  try {
    const configData = JSON.parse(fs.readFileSync(configPath));
    configData.waypoint = req.body.waypoint;
    output = configData;
  } catch (ex) { }
  fs.writeFileSync(configPath, JSON.stringify(output, null, 2));
  console.log('POST [/waypoint]', 'SUCCESS');
  return res.send('SUCCESS');
});

module.exports = router;
