const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

let gRawData = null;

function getRawData(filepath) {
  // const keys = ['dimension_height', 'dimension_width', 'origin_x', 'origin_y', 'resolution_x', 'resolution_y', 'type', 'explore'];

  const dataBuffer = fs.readFileSync(filepath);
  const heightStartIndex = dataBuffer.indexOf('dimension_height') + 'dimension_height'.length + 2;
  const heightEndIndex = dataBuffer.indexOf('dimension_width') - 2;
  const widthStartIndex = dataBuffer.indexOf('dimension_width') + 'dimension_width'.length + 2;
  const widthEndIndex = dataBuffer.indexOf('origin_x') - 2;
  const dimension_height = 1 * dataBuffer.slice(heightStartIndex, heightEndIndex).toString();
  const dimension_width = 1 * dataBuffer.slice(widthStartIndex, widthEndIndex).toString();
  const origin_x = 1 * dataBuffer.slice(dataBuffer.indexOf('origin_x') + 'origin_x'.length + 2, dataBuffer.indexOf('origin_y') - 2).toString();
  const origin_y = 1 * dataBuffer.slice(dataBuffer.indexOf('origin_y') + 'origin_y'.length + 2, dataBuffer.indexOf('resolution_x') - 2).toString();
  const resolution_x = 1 * dataBuffer.slice(dataBuffer.indexOf('resolution_x') + 'resolution_x'.length + 2, dataBuffer.indexOf('resolution_y') - 2).toString();
  const resolution_y = 1 * dataBuffer.slice(dataBuffer.indexOf('resolution_y') + 'resolution_y'.length + 2, dataBuffer.indexOf('type') - 2).toString();

  const binStartIndex = dataBuffer.indexOf('explore') + 'explore'.length;
  const binEndIndex = binStartIndex + dimension_height * dimension_width;
  const binData = dataBuffer.slice(binStartIndex, binEndIndex);

  return {
    temp: dataBuffer.slice(0, dataBuffer.indexOf('dimension_height')),
    header_pre_height: dataBuffer.slice(0, heightStartIndex),
    header_pre_width: dataBuffer.slice(heightEndIndex, widthStartIndex),
    header_post_width: dataBuffer.slice(widthEndIndex, binStartIndex),
    footer: dataBuffer.slice(binEndIndex),
    width: dimension_width,
    height: dimension_height,
    origin: { x: origin_x, y: origin_y },
    resolution: { x: resolution_x, y: resolution_y },
    bin: binData,
    size: dataBuffer.readUInt32LE(18) - binData.length
  };
}


function getImageData() {
  const newMapPath = path.join(__dirname, '../mock/map/new.map');
  const defaultMapPath = path.join(__dirname, '../mock/map/default.map');
  gRawData = fs.existsSync(newMapPath) ? getRawData(newMapPath) : getRawData(defaultMapPath);
  const parsedData = new Array(gRawData.width * gRawData.height);
  let cellIdx = 0;
  for (let j = gRawData.height - 1; j >= 0; j -= 1) {
    for (let i = 0; i < gRawData.width; i += 1) {
      const cellData = gRawData.bin.readUInt8(cellIdx);
      parsedData[gRawData.width * j + i] = 10;
      parsedData[gRawData.width * j + i] = cellData === 0 ? -1 : parsedData[gRawData.width * j + i];
      parsedData[gRawData.width * j + i] = cellData > 127 ? 90 : parsedData[gRawData.width * j + i];
      cellIdx += 1;
    }
  }
  return {
    width: gRawData.width,
    height: gRawData.height,
    origin: gRawData.origin,
    resolution: gRawData.resolution,
    data: parsedData
  };
}

/* GET users listing. */
router.get('/', function (req, res) {
  console.log('GET [/map]', 'SUCCESS');
  return res.send(['office']);
});

router.get('/content', function (req, res) {
  if (req.query.name === 'office') {
    // console.log('GET [/map/content]', 'SUCCESS');
    return res.send(getImageData());
  }
  console.log('GET [/map/content]', 'FAILED');
  return res.send(`Failed to get map data: ${req.query.name}`);
});

router.post('/', function (req, res) {
  if (req.body.name && req.body.data) {
    console.log('POST [/map]', 'SUCCESS');
    return res.send('SUCCESS');
  }
  console.log('POST [/map]', 'FAILED');
  return res.send('FAILED');
});

router.post('/scan', function (req, res) {
  console.log('POST [/map/scan]', 'SUCCESS');
  return res.send('SUCCESS');
});

router.post('/save', function (req, res) {
  console.log('POST [/map/save]', 'SUCCESS');
  saveMap(req.body.data);
  return res.send('SUCCESS');
});

router.post('/load', function (req, res) {
  console.log('POST [/map/load]', 'SUCCESS');
  return res.send('SUCCESS');
});


function saveMap({ bin, width, height }) {
  const newBuffer = Buffer.alloc(bin.length, 0);
  let cellIdx = 0;
  for (let i = height - 1; i >= 0; i -= 1) {
    for (let j = 0; j < width; j += 1) {
      const data = bin[i * width + j];
      newBuffer[cellIdx] = data === -1 ? 0 : data;
      cellIdx += 1;
    }
  }

  const newHeightLength = height.toString().length;
  const newWidthLength = width.toString().length;
  const diffLength = newHeightLength + newWidthLength - gRawData.height.toString().length - gRawData.width.toString().length;

  gRawData.header_pre_height[gRawData.header_pre_height.length - 2] = newHeightLength;
  gRawData.header_pre_width[gRawData.header_pre_width.length - 2] = newWidthLength;

  const concatData = Buffer.concat([
    gRawData.header_pre_height,
    Buffer.from(`${height}`),
    gRawData.header_pre_width,
    Buffer.from(`${width}`),
    gRawData.header_post_width,
    newBuffer,
    gRawData.footer
  ]);

  const sizeBuffer = Buffer.alloc(4);
  sizeBuffer.writeUInt32LE(newBuffer.length + gRawData.size + diffLength);
  concatData[18] = sizeBuffer[0];
  concatData[19] = sizeBuffer[1];
  concatData[20] = sizeBuffer[2];
  concatData[21] = sizeBuffer[3];

  const dirPath = path.join(__dirname, '..', 'mock', 'map');
  const filename = `${new Date().getTime()}.map`;
  const filePath = path.join(dirPath, filename);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, concatData);
  fs.writeFileSync(path.join(dirPath, 'new.map'), concatData);

  return filePath
}


module.exports = router;
