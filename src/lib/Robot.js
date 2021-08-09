import HttpClient from './HttpClient';

const httpClient = new HttpClient();

const sleepAsync = ms => new Promise(resolve => setTimeout(resolve, ms));

export const setPoint = async (data) => {
  try {
    console.log(new Date().getTime(), data.velocity.toFixed(3), data.angle.toFixed(3));
    await sleepAsync(30); // For Test
    return true;
    // return await httpClient.post('/set/point', data);

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const robotControl = async (type, data) => {
  try {
    return await httpClient.post(`/set/${type}`, data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
