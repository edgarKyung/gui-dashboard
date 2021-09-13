const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

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
    bin: binData
  };
}

function getImageData() {
  const rawData = getRawData(path.join(__dirname, '../mock/office.map'));
  const parsedData = new Array(rawData.width * rawData.height);
  let cellIdx = 0;
  for (let j = rawData.height - 1; j >= 0; j -= 1) {
    for (let i = 0; i < rawData.width; i += 1) {
      const cellData = rawData.bin.readUInt8(cellIdx);
      parsedData[rawData.width * j + i] = 10;
      parsedData[rawData.width * j + i] = cellData === 0 ? -1 : parsedData[rawData.width * j + i];
      parsedData[rawData.width * j + i] = cellData > 127 ? 90 : parsedData[rawData.width * j + i];
      cellIdx += 1;
    }
  }
  return {
    width: rawData.width,
    height: rawData.height,
    origin: rawData.origin,
    resolution: rawData.resolution,
    data: parsedData
  };
}

function rotaion(inputBuffer, radian, width, height) {
  const cosValue = Math.cos(radian);
  const sinValue = Math.sin(-radian);
  const xCenter = width / 2;
  const yCenter = height / 2;

  const outputSquareX = [];
  outputSquareX.push(parseInt(xCenter + (0 - yCenter) * sinValue + (0 - xCenter) * cosValue));
  outputSquareX.push(parseInt(xCenter + (0 - yCenter) * sinValue + (width - xCenter) * cosValue));
  outputSquareX.push(parseInt(xCenter + (height - yCenter) * sinValue + (0 - xCenter) * cosValue));
  outputSquareX.push(parseInt(xCenter + (height - yCenter) * sinValue + (width - xCenter) * cosValue));
  const minX = Math.min(...outputSquareX);
  const maxX = Math.max(...outputSquareX);

  const outputSquareY = [];
  outputSquareY.push(parseInt(yCenter + (0 - yCenter) * cosValue - (0 - xCenter) * sinValue));
  outputSquareY.push(parseInt(yCenter + (0 - yCenter) * cosValue - (width - xCenter) * sinValue));
  outputSquareY.push(parseInt(yCenter + (height - yCenter) * cosValue - (0 - xCenter) * sinValue));
  outputSquareY.push(parseInt(yCenter + (height - yCenter) * cosValue - (width - xCenter) * sinValue));
  const minY = Math.min(...outputSquareY);
  const maxY = Math.max(...outputSquareY);

  const outputWidth = maxX - minX;
  const outputHeight = maxY - minY;
  const outputBuffer = Buffer.alloc((outputWidth) * (outputHeight), 0x00);

  for (let y = minY; y < maxY; y += 1) {
    for (let x = minX; x < maxX; x += 1) {
      const orig_x = parseInt(xCenter + ((y) - yCenter) * sinValue + ((x) - xCenter) * cosValue);
      const orig_y = parseInt(yCenter + ((y) - yCenter) * cosValue - ((x) - xCenter) * sinValue);
      if ((orig_y >= 0 && orig_y < height) && (orig_x >= 0 && orig_x < width)) {
        outputBuffer[(y - minY) * outputWidth + x - minX] = inputBuffer[orig_y * width + orig_x];
      }
    }
  }

  return {
    width: outputWidth,
    height: outputHeight,
    bin: outputBuffer
  };
}

function saveRotateMap(rawData, radian) {
  const newData = rotaion(rawData.bin, radian, rawData.width, rawData.height);
  const sizeBuffer = Buffer.alloc(4);
  sizeBuffer.writeUInt32LE(newData.bin.length + 234);
  rawData.header_pre_height[18] = sizeBuffer[0];
  rawData.header_pre_height[19] = sizeBuffer[1];
  rawData.header_pre_height[20] = sizeBuffer[2];
  rawData.header_pre_height[21] = sizeBuffer[3];
  const concatData = Buffer.concat([
    rawData.header_pre_height,
    Buffer.from(`${newData.height}`),
    rawData.header_pre_width,
    Buffer.from(`${newData.width}`),
    rawData.header_post_width,
    newData.bin,
    rawData.footer
  ]);
  fs.writeFileSync('./rotate.map', concatData);
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
  return res.send('SUCCESS');
});

router.post('/load', function (req, res) {
  console.log('POST [/map/load]', 'SUCCESS');
  return res.send('SUCCESS');
});

module.exports = router;
