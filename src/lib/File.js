import HttpClient from './HttpClient';

const httpClient = new HttpClient();

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
    return await httpClient.post('/waypoint', { waypoint });

  } catch (err) {
    console.error(err);
    throw err;
  }
};
