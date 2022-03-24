import axios, { AxiosError, AxiosResponse } from 'axios';

const ibgeApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/',
});

const eject = ibgeApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    return error?.response;
  }
);

axios.interceptors.request.eject(eject);

export default ibgeApi;
