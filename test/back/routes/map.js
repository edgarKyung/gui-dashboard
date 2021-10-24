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
  const rawData = fs.existsSync(newMapPath) ? getRawData(newMapPath) : getRawData(defaultMapPath);
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
  const temp_data = ['file1', 'file2', 'file3', 'file4'];
  return res.send(temp_data);
});


function getAreaSize({ bin, width, height }) {
  const area = { top: -1, left: -1, right: -1, bottom: -1 };
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      if (bin[i * width + j] !== 0) {
        area.top = i;
        break;
      }
    }
    if (area.top !== -1) {
      break;
    }
  }

  for (let i = height - 1; i >= 0; i -= 1) {
    for (let j = 0; j < width; j += 1) {
      if (bin[i * width + j] !== 0) {
        area.bottom = i;
        break;
      }
    }
    if (area.bottom !== -1) {
      break;
    }
  }

  for (let j = 0; j < width; j += 1) {
    for (let i = 0; i < height; i += 1) {
      if (bin[i * width + j] !== 0) {
        area.left = j;
        break;
      }
    }
    if (area.left !== -1) {
      break;
    }
  }

  for (let j = width - 1; j >= 0; j -= 1) {
    for (let i = 0; i < height; i += 1) {
      if (bin[i * width + j] !== 0) {
        area.right = j;
        break;
      }
    }
    if (area.right !== -1) {
      break;
    }
  }
  return area;
}

function saveMap({ bin, width, height }) {
  const origin_x = '0.000000';
  const origin_y = '0.000000';
  const buf_origin_x = Buffer.concat([Buffer.from([8, 0, 111, 114, 105, 103, 105, 110, 95, 120, origin_x.length, 0]), Buffer.from(origin_x)]);
  const buf_origin_y = Buffer.concat([Buffer.from([8, 0, 111, 114, 105, 103, 105, 110, 95, 121, origin_y.length, 0]), Buffer.from(origin_y)]);
  const buf_resolution_x = Buffer.from([12, 0, 114, 101, 115, 111, 108, 117, 116, 105, 111, 110, 95, 120, 4, 0, 48, 46, 48, 53]);
  const buf_resolution_y = Buffer.from([12, 0, 114, 101, 115, 111, 108, 117, 116, 105, 111, 110, 95, 121, 4, 0, 48, 46, 48, 53]);
  const buf_type = Buffer.from([4, 0, 116, 121, 112, 101, 41, 0, 118, 110, 100, 46, 115, 108, 97, 109, 116, 101, 99, 46, 109, 97, 112, 45, 108, 97, 121, 101, 114, 47, 118, 110, 100, 46, 103, 114, 105, 100, 45, 109, 97, 112, 43, 98, 105, 110, 97, 114, 121, 5, 0, 117, 115, 97, 103, 101, 7, 0, 101, 120, 112, 108, 111, 114, 101]);

  const preSize = Buffer.from([83, 84, 67, 77, 18, 0, 1, 0, 1, 0, 1, 0, 3, 0, 0, 0, 0, 0])
  const preHeight = Buffer.from([8, 0, 16, 0, 100, 105, 109, 101, 110, 115, 105, 111, 110, 95, 104, 101, 105, 103, 104, 116]);
  const preWidth = Buffer.from([15, 0, 100, 105, 109, 101, 110, 115, 105, 111, 110, 95, 119, 105, 100, 116, 104]);
  const postWidth = Buffer.concat([buf_origin_x, buf_origin_y, buf_resolution_x, buf_resolution_y, buf_type]);
  const footer = Buffer.from([87, 0, 0, 0, 3, 0, 5, 0, 99, 111, 117, 110, 116, 1, 0, 48, 4, 0, 116, 121, 112, 101, 41, 0, 118, 110, 100, 46, 115, 108, 97, 109, 116, 101, 99, 46, 109, 97, 112, 45, 108, 97, 121, 101, 114, 47, 118, 110, 100, 46, 108, 105, 110, 101, 45, 109, 97, 112, 43, 98, 105, 110, 97, 114, 121, 5, 0, 117, 115, 97, 103, 101, 13, 0, 118, 105, 114, 116, 117, 97, 108, 95, 119, 97, 108, 108, 115, 88, 0, 0, 0, 3, 0, 5, 0, 99, 111, 117, 110, 116, 1, 0, 48, 4, 0, 116, 121, 112, 101, 41, 0, 118, 110, 100, 46, 115, 108, 97, 109, 116, 101, 99, 46, 109, 97, 112, 45, 108, 97, 121, 101, 114, 47, 118, 110, 100, 46, 108, 105, 110, 101, 45, 109, 97, 112, 43, 98, 105, 110, 97, 114, 121, 5, 0, 117, 115, 97, 103, 101, 14, 0, 118, 105, 114, 116, 117, 97, 108, 95, 116, 114, 97, 99, 107, 115, 10]);
  const size = 174 + origin_x.length + origin_y.length;

  const area = getAreaSize({ bin, width, height });
  const newWidth = area.right - area.left + 1;
  const newHeight = area.bottom - area.top + 1;
  const newHeightLength = newHeight.toString().length;
  const newWidthLength = newWidth.toString().length;
  const sizeBuffer = Buffer.alloc(4);
  const newBuffer = Buffer.alloc(newWidth * newHeight, 0);

  let cellIdx = 0;
  for (let i = area.bottom; i >= area.top; i -= 1) {
    for (let j = area.left; j <= area.right; j += 1) {
      const data = bin[i * width + j];
      newBuffer[cellIdx] = data === -1 ? 0 : data;
      cellIdx += 1;
    }
  }

  sizeBuffer.writeUInt32LE(newBuffer.length + size + newHeightLength + newWidthLength);

  const concatData = Buffer.concat([
    preSize,
    sizeBuffer,
    preHeight,
    Buffer.from([newHeightLength, 0]),
    Buffer.from(`${newHeight}`),
    preWidth,
    Buffer.from([newWidthLength, 0]),
    Buffer.from(`${newWidth}`),
    postWidth,
    newBuffer,
    footer
  ]);

  const dirPath = path.join(__dirname, '..', 'mock', 'map');
  const filename = `${new Date().getTime()}.map`;
  const filePath = path.join(dirPath, filename);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, concatData);
  fs.writeFileSync(path.join(dirPath, 'new.map'), concatData);

  return filePath
}


module.exports = router;
