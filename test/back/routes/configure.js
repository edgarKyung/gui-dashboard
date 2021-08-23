const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  console.log('GET [/configure]', 'SUCCESS');
  return res.send('SUCCESS');
});

router.post('/', function (req, res) {
  console.log('POST [/configure]', 'SUCCESS');
  return res.send('SUCCESS');
});

router.post('/', function (req, res) {
  console.log('POST [/configure/load]', 'SUCCESS');
  return res.send('SUCCESS');
});

router.post('/', function (req, res) {
  console.log('POST [/configure/save]', 'SUCCESS');
  return res.send('SUCCESS');
});

module.exports = router;
