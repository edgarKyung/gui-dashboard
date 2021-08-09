const express = require('express');
const cors = require('cors');
const app = express();
const port = 80;

app.use(express.json());
app.use(cors());

app.post('/mode', (req, res) => {
  const mode = req.body.mode;
  const data = {
    human: mode.human ? 'start' : 'stop',
    line: mode.line ? 'start' : 'stop',
    navigation: mode.navigation ? 'start' : 'stop'
  };
  console.log(data);
  res.send(JSON.stringify(data));
});

app.post('/move', (req, res) => {
  const velocity = req.body.velocity ? req.body.velocity : 0;
  const angle = req.body.angle ? req.body.angle : 0;
  const data = {
    linear: { x: velocity, y: 0, z: 0 },
    angular: { x: 0, y: 0, z: angle }
  };
  console.log(data);
  return res.send(JSON.stringify(data));
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
