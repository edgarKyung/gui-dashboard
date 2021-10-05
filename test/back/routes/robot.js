const express = require('express');
const router = express.Router();

const dataset = require('../mock/dataset');

let gData = dataset.getData();
setInterval(() => gData = dataset.getData(), 2000);

router.get('/date', function (req, res) {
  const data = { date: new Date().getTime() };
  console.log('GET [/robot/date]', JSON.stringify(data));
  return res.send(data);
});

router.get('/info', function (req, res) {
  const data = { title: 'Ardent Robot Corp.', version: 'v1.0.1', contact: 'contact@ardentrobot.com' };
  console.log('GET [/robot/info]', JSON.stringify(data));
  return res.send(data);
});

router.get('/battery', function (req, res) {
  // current 음수(충전), 양수(방전)
  // Time 단위 (m)
  const data = { voltage: 10, current: 3, percent: 90, chargeTime: 0, dischargeTime: 321, temperature: 60 };
  console.log('GET [/robot/battery]', JSON.stringify(data));
  return res.send(data);
});

router.get('/status', function (req, res) {
  const data = { status: 'ready', mode: 'joystick', state: 'stop' };
  console.log('GET [/robot/status]', JSON.stringify(data));
  return res.send(data);
});

router.get('/pose', function (req, res) {
  const data = gData.pose;
  // console.log('GET [/robot/pose]', JSON.stringify(data));
  return res.send(data);
});

router.get('/sensor', function (req, res) {
  const data = gData.laser;
  // console.log('GET [/robot/sensor]', JSON.stringify(data));
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

router.post('/stop', function (req, res) {
  const data = {
    linear: { x: 0, y: 0, z: 0 },
    angular: { x: 0, y: 0, z: 0 }
  };
  console.log('POST [/robot/stop]', JSON.stringify(data));
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

router.post('/pause', function (req, res) {
  const data = { x: 0, y: 0, rz: 1.57 };
  console.log('POST [/robot/pause]', 'pose:', JSON.stringify(data));
  return res.send(data);
});

router.post('/charge', function (req, res) {
  const data = { charging: 'start' };
  console.log('POST [/robot/charge]', JSON.stringify(data));
  return res.send(data);
});


module.exports = router;
