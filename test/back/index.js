const express = require('express');
const cors = require('cors');
const app = express();
const port = 80;

const configureRouter = require('./routes/configure');
const mapRouter = require('./routes/map');
const robotRouter = require('./routes/robot');
const scheduleRouter = require('./routes/schedule');
const wallRouter = require('./routes/wall');
const waypointRouter = require('./routes/waypoint');

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('../../build'));

app.use('/configure', configureRouter);
app.use('/map', mapRouter);
app.use('/robot', robotRouter);
app.use('/schedule', scheduleRouter);
app.use('/wall', wallRouter);
app.use('/waypoint', waypointRouter);

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
