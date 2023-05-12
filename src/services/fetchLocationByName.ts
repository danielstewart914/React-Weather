import OpenWeatherAPIClient from './OpenWeatherAPIClient';

export interface Location {
	lat: number;
	lon: number;
	name: string;
	country: string;
	state?: string;
}

const weatherAPIClient = new OpenWeatherAPIClient<Location[]>('/geo/1.0/direct');

const fetchLocationByName = async (query: string) => {
	return weatherAPIClient
		.getAll({
			params: {
				q: query,
			},
		})
		.then((res) => res[0]);
};

export default fetchLocationByName;
