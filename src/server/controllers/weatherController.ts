import { Request, Response } from 'express';
import fetchLocationByLatLon from '../../services/fetchLocationByLatLon';
import fetchLocationByName, { Location } from '../../services/fetchLocationByName';
import fetchWeather, { WeatherForecast } from '../../services/fetchWeather';
import filterWeatherData from '../utils/filterWeatherData';

interface SearchParams {
	search: string;
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
      country: location.country,
      state: location.state
    },
    timezone: weatherData.timezone,
    current: filterWeatherData(weatherData.current),
    daily: weatherData.daily.map((data) => filterWeatherData(data)),
  };
}

export const getWeatherByLocationName = async (
	req: Request<{}, {}, {}, SearchParams>,
	res: Response
) => {
	try {
		const location = await fetchLocationByName(req.query.search);

		if (!location) res.status(400).json({ message: 'Location not found' });

		const weatherData = await fetchWeather(
			location.lat,
			location.lon,
			req.query.units
		);

		const response = createResponse(location, weatherData);

		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
};

export const getWeatherByLatLon = async (
	req: Request<{}, {}, {}, LocationParams>,
	res: Response
) => {
  try {
		const weatherData = await fetchWeather(
			req.query.lat,
			req.query.lon,
			req.query.units
		);

    const location = await fetchLocationByLatLon(req.query.lat, req.query.lon);

		const response = createResponse(location, weatherData);

		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
};
