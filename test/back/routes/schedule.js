const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  try {
    const configPath = path.join(__dirname, '../mock/configure._.json');
    const configData = JSON.parse(fs.readFileSync(configPath));
    console.log('GET [/schedule]', 'SUCCESS');
    return res.send(configData.schedule || []);

  } catch (ex) {
    console.log('GET [/schedule]', 'FAILED');
    return res.send('FAILED');
  }
});

router.post('/', function (req, res) {
  const configPath = path.join(__dirname, '../mock/configure._.json');
  let output = { schedule: req.body.schedule };
  try {
    const configData = JSON.parse(fs.readFileSync(configPath));
    configData.schedule = req.body.schedule;
    output = configData;
  } catch (ex) { }
  fs.writeFileSync(configPath, JSON.stringify(output, null, 2));
  console.log('POST [/schedule]', 'SUCCESS');
  return res.send('SUCCESS');
});

module.exports = router;
