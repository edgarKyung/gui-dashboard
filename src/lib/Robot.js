import HttpClient from './HttpClient';

const httpClient = new HttpClient();

export const moveControl = async (data) => {
  try {
    const response = await httpClient.post('/move', data);
    console.log(data, response);
    return response;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const setGoal = async (data) => {
  try {
    const response = await httpClient.post('/goal', data);
    console.log(data, response);
    return response;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const robotControl = async (type, data) => {
  try {
    // return await httpClient.post(`/state`, { state: type });
    // TEMPORARY
    return await httpClient.post(`/mode`, { mode: type });

  } catch (err) {
    console.error(err);
    throw err;
  }
};
