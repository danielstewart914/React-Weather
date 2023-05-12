import OpenWeatherAPIClient from './OpenWeatherAPIClient';

export interface WeatherData {
	dt: number;
	sunrise: number;
	sunset: number;
	temp:
		| number
		| {
				day: number;
				min: number;
				max: number;
		  };
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust?: number;
	weather: [
		{
			icon: string;
			description: string;
		}
	];
}

export interface WeatherForecast {
	timezone: string;
	current: WeatherData;
	daily: WeatherData[];
}

const weatherAPIClient = new OpenWeatherAPIClient<WeatherForecast>(
	'/data/2.5/onecall'
);

const fetchWeather = async (
	lat: number,
	lon: number,
	units: string = 'imperial'
) => {
	return weatherAPIClient.getAll({
		params: {
			lat,
			lon,
			units,
			exclude: 'minutely,hourly',
		},
	});
};

export default fetchWeather;
