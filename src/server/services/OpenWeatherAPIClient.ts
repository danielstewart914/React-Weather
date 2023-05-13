import axios, { AxiosRequestConfig } from 'axios';

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appid: process.env.OPEN_WEATHER_MAP_API_KEY
  }
});

class OpenWeatherAPIClient<T> {
  endpoint: string;

  constructor (endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(this.endpoint, config)
      .then(res => res.data)
  };
}

export default OpenWeatherAPIClient;