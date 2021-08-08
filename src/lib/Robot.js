import HttpClient from './HttpClient';

const httpClient = new HttpClient();

export const setPoint = async (data) => {
    try {
        return await httpClient.post('/set/point', data);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const robotControl = async (type,data) => {
    try {
        return await httpClient.post(`/set/${type}`, data);
    } catch (err) {
        console.error(err);
        throw err;
    }
};
