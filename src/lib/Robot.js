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

export const stop = async () => {
  try {
    const response = await httpClient.post('/robot/stop', {});
    // console.log(data, response);
    return response;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const move = async (data) => {
  try {
    if (data) {
      console.log(data);
      const response = await httpClient.post('/robot/move', data.real);
      // console.log(data, response);
      return response;
    }

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const changeMode = async (data) => {
  try {
    console.log(data);
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

let poseCache = {};
let editPoseCache = null;
let poseUpdateTimer = null;
export const setPose = ({ x, y, rz }) => {
  try {
    editPoseCache = editPoseCache || JSON.parse(JSON.stringify(poseCache));
    editPoseCache.x += x;
    editPoseCache.y += y;
    editPoseCache.rz += rz;

    if (poseUpdateTimer) {
      clearTimeout(poseUpdateTimer);
    }

    poseUpdateTimer = setTimeout(async () => {
      poseUpdateTimer = null;
      await httpClient.post(`/robot/pose`, editPoseCache);
      editPoseCache = null;
    }, 2000);

    return editPoseCache;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPose = async () => {
  try {
    if (editPoseCache) {
      return editPoseCache;
    }
    poseCache = await httpClient.get(`/robot/pose`, {});
    return poseCache;

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

export const saveMap = async (name, data) => {
  try {
    return await httpClient.post(`/map/save`, { name, data });

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMapList = async () => {
  try {
    return await httpClient.get(`/map`, {});

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadMap = async (mapFileName) => {
  try {
    return await httpClient.post(`/map/load`, { file: mapFileName });

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

export const charge = async () => {
  try {
    return await httpClient.post(`/robot/charge`, {});

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const battery = async () => {
  try {
    return await httpClient.get(`/robot/battery`, {});
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const status = async () => {
  try {
    return await httpClient.get(`/robot/status`, {});
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const info = async () => {
  try {
    return await httpClient.get(`/robot/info`, {});
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const date = async () => {
  try {
    return await httpClient.get(`/robot/date`, {});
  } catch (err) {
    console.error(err);
    throw err;
  }
};


let slowMoveInterval = null;
export const slowMove = async (type) => {
  if (slowMoveInterval) {
    clearInterval(slowMoveInterval);
    slowMoveInterval = null;
  }

  if (type === 'forward') {
    slowMoveInterval = setInterval(async () => {
      console.log('forward')
      await httpClient.post('/robot/jog', { linear: 0.3, angular: 0 });
    }, 100);
    return 'forward';
  }

  if (type === 'backward') {
    slowMoveInterval = setInterval(async () => {
      console.log('backward')
      await httpClient.post('/robot/jog', { linear: -0.3, angular: 0 });
    }, 100);
    return 'backward';
  }

  return await httpClient.post('/robot/stop', {});
};
