import HttpClient from './HttpClient';

const httpClient = new HttpClient();

const sleepAsync = ms => new Promise(resolve => setTimeout(resolve, ms));

export const setPoint = async (data) => {
  try {
    // await sleepAsync(30); // For Test
    const response = await httpClient.post('/move', data);
    console.log(data, response);
    return response;

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
