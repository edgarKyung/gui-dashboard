const express = require('express');
const router = express.Router();

const dataset = require('../mock/dataset');

let gData = dataset.getData();
setInterval(() => gData = dataset.getData(), 2000);

router.get('/info', function (req, res) {
  console.log('GET [/robot/info]', JSON.stringify({ title: 'Ardent Robot Corp.', version: 'v1.0.1', contact: 'contact@ardentrobot.com' }));
  return res.send({ title: 'Ardent Robot Corp.', version: 'v1.0.1', contact: 'contact@ardentrobot.com' });
});

router.get('/date', function (req, res) {
  console.log('GET [/robot/date]', JSON.stringify({ date: new Date().getTime() }));
  return res.send({ date: new Date().getTime() });
});

router.get('/battery', function (req, res) {
  console.log('GET [/robot/battery]', JSON.stringify({ battery: 90 }));
  return res.send({ battery: 90 });
});

router.get('/status', function (req, res) {
  console.log('GET [/robot/status]', JSON.stringify({ status: 'ready' }));
  return res.send({ status: 'ready' });
});

router.get('/pose', function (req, res) {
  console.log('GET [/robot/pose]', JSON.stringify(gData.pose));
  return res.send(gData.pose);
});

router.get('/sensor', function (req, res) {
  console.log('GET [/robot/sensor]', JSON.stringify(gData.laser));
  return res.send(gData.laser);
});

router.post('/jog', function (req, res) {
  const velocity_linear = req.body.linear ? req.body.linear : 0;
  const velocity_angular = req.body.angular ? req.body.angular : 0;
  const data = {
    linear: { x: velocity_linear, y: 0, z: 0 },
    angular: { x: 0, y: 0, z: velocity_angular }
  };
  console.log('POST [/robot/jog]', JSON.stringify(data));
  return res.send(data);
});

router.post('/move', function (req, res) {
  const x = req.body.x;
  const y = req.body.y;
  const rz = req.body.degree;
  const data = {
    position: { x: x, y: y, z: 0 },
    orientation: { x: 0, y: 0, z: rz, w: 1 - rz }
  };
  console.log('POST [/robot/move]', JSON.stringify(data));
  return res.send(data);
});

router.post('/stop', function (req, res) {
  const data = {
    linear: { x: 0, y: 0, z: 0 },
    angular: { x: 0, y: 0, z: 0 }
  };
  console.log('POST [/robot/stop]', JSON.stringify(data));
  return res.send(data);
});

router.post('/mode', function (req, res) {
  const mode = req.body.mode;
  const data = {
    human: mode === 'people' ? 'start' : 'stop',
    line: mode === 'line' ? 'start' : 'stop',
    navigation: mode === 'navigation' ? 'start' : 'stop'
  };
  console.log('POST [/robot/mode]', JSON.stringify(data));
  return res.send(data);
});

module.exports = router;
