import HttpClient from './HttpClient';

const httpClient = new HttpClient();

const map = {};
const opMap = {};

export const setOpMapData = async (data) => {
  try {
    opMap.scale = data.scale;
    opMap.padding = data.padding;
    opMap.canvas_width = data.width;
    opMap.canvas_height = data.height;
    opMap.origin_x = data.origin.x;
    opMap.origin_y = data.origin.y;
    opMap.resolution_x = data.resolution.x;
    opMap.resolution_y = data.resolution.y;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const setMapData = async (data) => {
  try {
    map.scale = data.scale;
    map.padding = data.padding;
    map.canvas_width = data.width;
    map.canvas_height = data.height;
    map.origin_x = data.origin.x;
    map.origin_y = data.origin.y;
    map.resolution_x = data.resolution.x;
    map.resolution_y = data.resolution.y;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadWayPoint = async (data) => {
  try {
    const response = await httpClient.get('/waypoint', data);
    return response;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const realXToScreen = (realX) => {
  try {
    return (opMap.padding.left + (realX - opMap.origin_x) / opMap.resolution_x) * opMap.scale;
  } catch (ex) {
    return -100;
  }
}

export const realYToScreen = (realY) => {
  try {
    return (opMap.padding.top + (opMap.canvas_height - (realY - opMap.origin_y) / opMap.resolution_y)) * opMap.scale;
  } catch (ex) {
    return -100;
  }
}

export const saveWayPoint = async (waypoint) => {
  try {
    for (let wp of waypoint) {
      wp.real = {};
      wp.real.x = map.origin_x + (wp.x - (map.padding.left) * map.scale) / map.scale * map.resolution_x;
      wp.real.y = map.origin_y - (wp.y - (map.padding.top + map.canvas_height) * map.scale) / map.scale * map.resolution_y;
      wp.degree = Math.floor((wp.degree + 3600) % 360);
      wp.real.degree = (wp.degree + 90) % 360;
      wp.real.degree = (wp.real.degree > 180 ? wp.real.degree : wp.real.degree - 360) / 180 * Math.PI;
    }
    return await httpClient.post('/waypoint', { waypoint });

  } catch (err) {
    console.error(err);
    throw err;
  }
};
