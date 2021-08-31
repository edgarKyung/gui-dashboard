const fs = require('fs');
const path = require('path');

const rawData = {};
let currentRadian = 0;

function loadRawData(filepath) {
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

  rawData.temp = dataBuffer.slice(0, dataBuffer.indexOf('dimension_height'));
  rawData.header_pre_height = dataBuffer.slice(0, heightStartIndex);
  rawData.header_pre_width = dataBuffer.slice(heightEndIndex, widthStartIndex);
  rawData.header_post_width = dataBuffer.slice(widthEndIndex, binStartIndex);
  rawData.footer = dataBuffer.slice(binEndIndex);
  rawData.width = dimension_width;
  rawData.height = dimension_height;
  rawData.origin = { x: origin_x, y: origin_y };
  rawData.resolution = { x: resolution_x, y: resolution_y };
  rawData.bin = binData;
  rawData.size = dataBuffer.readUInt32LE(18) - binData.length;

  currentRadian = 0;
}

function parseBin({ bin, width, height }) {
  const parsedData = new Array(width * height);
  let cellIdx = 0;
  for (let j = height - 1; j >= 0; j -= 1) {
    for (let i = 0; i < width; i += 1) {
      const cellData = bin.readUInt8(cellIdx);
      parsedData[width * j + i] = cellData === 0 ? -1 : cellData;
      cellIdx += 1;
    }
  }
  return parsedData;
}

function getImageData(filename) {
  loadRawData(`./map/${filename}`);
  const parsedData = parseBin(rawData);
  return {
    bin: parsedData,
    width: rawData.width,
    height: rawData.height,
    origin: rawData.origin,
    resolution: rawData.resolution
  };
}

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

  const concatData = Buffer.concat([
    rawData.header_pre_height,
    Buffer.from(`${height}`),
    rawData.header_pre_width,
    Buffer.from(`${width}`),
    rawData.header_post_width,
    newBuffer,
    rawData.footer
  ]);

  const sizeBuffer = Buffer.alloc(4);
  sizeBuffer.writeUInt32LE(newBuffer.length + rawData.size);
  concatData[18] = sizeBuffer[0];
  concatData[19] = sizeBuffer[1];
  concatData[20] = sizeBuffer[2];
  concatData[21] = sizeBuffer[3];

  const filename = `map/temp/${new Date().getTime()}.map`;
  fs.writeFileSync(`./${filename}`, concatData);

  return path.join(__dirname, filename);
}

module.exports = {
  getImageData: getImageData,
  saveMap: saveMap
};
