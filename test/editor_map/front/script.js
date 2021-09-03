// const IP = '192.168.1.197';
const IP = '127.0.0.1:8888';
const PADDING = 30;

let scale = 1;

function setImageFromMap({ bin, width, height }) {
  scale = Math.max(width / 600, height / 600);

  const canvas = document.getElementById('map');
  canvas.style.width = width / scale;
  canvas.style.height = height / scale;

  const ctx = document.getElementById('map').getContext('2d');
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  const imageData = ctx.getImageData(0, 0, width, height);
  for (let cell = 0; cell < width * height; cell += 1) {
    let color = [240, 240, 236]; // Movable Area
    color = (bin[cell] > 127) ? [30, 30, 30] : color; // Unmovable Area
    color = (bin[cell] === -1) ? [255, 255, 255] : color; // Unknown Area
    imageData.data[cell * 4 + 0] = color[0]
    imageData.data[cell * 4 + 1] = color[1]
    imageData.data[cell * 4 + 2] = color[2]
    imageData.data[cell * 4 + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

function getMapFromImage() {
  const ctx = document.getElementById('map').getContext('2d');
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);
  const bin = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i] === 255) {
      bin.push(-1);   // Unknown Area
      continue;
    }
    if (imageData.data[i] > 200) {
      bin.push(127);      // Movable Area
      continue;
    }
    if (imageData.data[i] > 10) {
      bin.push(255);  // Unmovable Area
      continue;
    }
  }
  return {
    bin: bin,
    width: width,
    height: height
  };
}

async function init() {
  initCanvas();
  await loadMap({ padding: PADDING });
  const map = getMap();
  setImageFromMap(map);
}

async function rotate() {
  const degree = document.getElementById('degree').value;
  rotateMap(degree, PADDING);
  const map = getMap();
  setImageFromMap(map);
}

async function save() {
  const map = getMapFromImage();
  saveMap(map, PADDING);
}



let drawable = false;
let pos = { x: -1, y: -1 };
let canvas2 = null;
let ctx2 = null;

function initCanvas() {
  canvas2 = document.getElementById("map");
  ctx2 = canvas2.getContext("2d");
  canvas2.addEventListener("mousedown", listener);
  canvas2.addEventListener("mousemove", listener);
  canvas2.addEventListener("mouseup", listener);
  canvas2.addEventListener("mouseout", listener);
}

function listener(event) {
  switch (event.type) {
    case "mousedown":
      startDraw(event);
      break;

    case "mousemove":
      if (drawable)
        moveDraw(event);
      break;

    case "mouseout":
    case "mouseup":
      endDraw();
      break;
  }
}

function startDraw(event) {
  getPosition(event);
  drawable = true;

  ctx2.lineWidth = document.getElementById('weight').value * scale;
  ctx2.beginPath();
  ctx2.moveTo(pos.X, pos.Y);
}

function moveDraw(event) {
  if (drawable) {
    getPosition(event);
    ctx2.lineTo(pos.x, pos.y);
    ctx2.stroke();
  }
}

function endDraw() {
  drawable = false;
}

function getPosition(event) {
  pos.x = (event.pageX - canvas2.offsetLeft) * scale;
  pos.y = (event.pageY - canvas2.offsetTop) * scale;
}

function setColor(color) {
  console.log(color);
  ctx2.strokeStyle = color;
}