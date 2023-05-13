import { Request, Response } from 'express';
import fetchLocationByLatLon from '../services/fetchLocationByLatLon';
import fetchLocationByName, {
	Location,
} from '../services/fetchLocationByName';
import fetchWeather, { WeatherForecast } from '../services/fetchWeather';
import filterWeatherData from '../utils/filterWeatherData';
import countryCodes from '../data/countryCodes';
interface SearchParams {
	query: string;
	units?: string;
}

interface LocationParams {
	lat: number;
	lon: number;
	units?: string;
}

const createResponse = (location: Location, weatherData: WeatherForecast) => {
	return {
		location: {
			name: location.name,
			country: countryCodes[location.country],
			state: location.state,
		},
		timezone: weatherData.timezone,
		current: filterWeatherData(weatherData.current),
		daily: weatherData.daily.map((data) => filterWeatherData(data)),
	};
};

export const getWeatherByLocationName = async (
	{ query: { query, units } }: Request<{}, {}, {}, SearchParams>,
	res: Response
) => {
	try {
		const location = await fetchLocationByName(query);
		if (!location) res.status(400).json({ message: 'Location not found' });

		const weatherData = await fetchWeather(location.lat, location.lon, units);
		const response = createResponse(location, weatherData);

		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
};

export const getWeatherByLatLon = async (
	{ query: { lat, units, lon } }: Request<{}, {}, {}, LocationParams>,
	res: Response
) => {
	try {
		const weatherData = await fetchWeather(lat, lon, units);
		const location = await fetchLocationByLatLon(lat, lon);
		const response = createResponse(location, weatherData);

		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
};
