import HttpClient from './HttpClient';

const httpClient = new HttpClient();

const map = {};

export const setMapData = async (data) => {
  try {
    map.scale = 2.7;
    map.canvas_padding = 10;
    map.canvas_width = data.width;
    map.canvas_height = data.height;
    map.origin_x = data.origin.x;
    map.origin_y = data.origin.y;
    map.resolution_x = data.resolution.x;
    map.resolution_y = data.resolution.y;
    // console.log(map);

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

export const saveWayPoint = async (waypoint) => {
  try {
    for (let wp of waypoint) {
      wp.real = {};
      console.log(wp.x);
      wp.real.x = (wp.x - map.canvas_padding) * map.resolution_x / map.scale + map.origin_x;
      wp.real.y = (map.canvas_padding + map.canvas_height - wp.y) * map.resolution_y / map.scale + map.origin_y;
    }
    return await httpClient.post('/waypoint', { waypoint });

  } catch (err) {
    console.error(err);
    throw err;
  }
};
