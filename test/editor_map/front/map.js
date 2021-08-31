let MAP = null;
let MAP_REPL = null;
let RADIAN = 0;

async function loadMap({ padding }) {
  const req = await fetch(`http://${IP}/map/content`);
  const res = await req.json();
  MAP = res;
  rotateMap(0, padding);
}

function getMap() {
  return MAP_REPL;
}

function rotateMap(degree, padding) {
  if (MAP) {
    RADIAN += (degree / 180 * Math.PI);
    MAP_REPL = Matrix.rotaion(MAP, RADIAN, padding);
  }
}


async function saveMap({ bin, width, height }, padding) {
  console.log(width, height);
  const req = await fetch(`http://${IP}/map/save`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bin, width, height })
  });
  const res = await req.text();
  console.log(res);
}

