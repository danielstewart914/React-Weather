import OpenWeatherAPIClient from './OpenWeatherAPIClient';
import { Location } from './fetchLocationByName';

const weatherAPIClient = new OpenWeatherAPIClient<Location[]>('/geo/1.0/reverse');

const fetchLocationByLatLon = async (lat: number, lon: number) => {
	return weatherAPIClient
		.getAll({
			params: {
				lat,
        lon
			},
		})
		.then((res) => res[0]);
};

export default fetchLocationByLatLon;
