const express = require('express');
const cors = require('cors');
const app = express();
const port = 8888;

const map = require('./map');

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false, limit: "500mb" }));

app.get('/map/content', function (req, res) {
  console.log('GET [/map/content]', 'SUCCESS');
  const mapData = map.getImageData('office.map');
  return res.send(mapData);
});

app.post('/map/save', function (req, res) {
  console.log('POST [/map/save]', 'SUCCESS');
  const mapData = req.body;
  const filePath = map.saveMap(mapData);
  return res.send(filePath);
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
