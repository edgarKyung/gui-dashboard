import HttpClient from './HttpClient';

const httpClient = new HttpClient();

export const jog = async (data) => {
  try {
    const response = await httpClient.post('/robot/jog', data);
    console.log(data, response);
    return response;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const move = async (data) => {
  try {
    data.x = data.real.x;
    data.y = data.real.y;
    const response = await httpClient.post('/robot/move', data);
    console.log(data, response);
    return response;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const changeMode = async (data) => {
  try {
    // return await httpClient.post(`/state`, { state: type });
    // TEMPORARY
    return await httpClient.post(`/robot/mode`, { mode: data });

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMap = async (name) => {
  try {
    return await httpClient.get(`/map/content?name=${name}`, {});

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPose = async () => {
  try {
    return await httpClient.get(`/robot/pose`, {});

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSensor = async () => {
  try {
    return await httpClient.get(`/robot/sensor`, {});

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const scanMap = async () => {
  try {
    return await httpClient.post(`/map/scan`, {});

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const saveMap = async () => {
  try {
    return await httpClient.post(`/map/save`, {});

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadMap = async () => {
  try {
    return await httpClient.post(`/map/load`, {});

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getWaypoint = async () => {
  try {
    return await httpClient.get(`/waypoint`, {});

  } catch (err) {
    console.error(err);
    throw err;
  }
};
