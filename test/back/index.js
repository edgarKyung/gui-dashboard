const express = require('express');
const cors = require('cors');
const util = require('./util');
const dataset = require('./dataset');
const map = require('./map');
const app = express();
const port = 80;

app.use(express.json());
app.use(cors());

app.use(express.static('build'));

app.post('/state', (req, res) => {
  const state = req.body.state;
  console.log(state);
  return res.send(state);
});

app.post('/mode', (req, res) => {
  const mode = req.body.mode;
  const data = {
    human: mode === 'people' ? 'start' : 'stop',
    line: mode === 'line' ? 'start' : 'stop',
    navigation: mode === 'navigation' ? 'start' : 'stop'
  };
  console.log(data);
  return res.send(JSON.stringify(data));
});

app.post('/move', (req, res) => {
  const velocity_linear = req.body.linear ? req.body.linear : 0;
  const velocity_angular = req.body.angular ? req.body.angular : 0;
  const data = {
    linear: { x: velocity_linear, y: 0, z: 0 },
    angular: { x: 0, y: 0, z: velocity_angular }
  };
  console.log(data);
  return res.send(JSON.stringify(data));
});

app.post('/goal', (req, res) => {
  const x = req.body.x;
  const y = req.body.y;
  const rz = req.body.degree;
  const quaternion = util.euler_to_quaternion(0, 0, rz);
  const data = {
    position: { x: x, y: y, z: 0 },
    orientation: quaternion
  };
  console.log(data);
  return res.send(JSON.stringify(data));
});

app.get('/map', (req, res) => {
  return res.send(map.getImageData());

});

app.get('/status', (req, res) => {
  return res.send(dataset.getData());
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
