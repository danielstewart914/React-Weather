import { WeatherData } from '../../services/fetchWeather';

const filterWeatherData = ({
	dt,
	sunrise,
	sunset,
	temp,
	humidity,
	dew_point,
	uvi,
	clouds,
	wind_speed,
	wind_deg,
	wind_gust,
	weather: [{ icon, description }],
}: WeatherData) => {
	return {
		dt,
		sunrise,
		sunset,
		temp:
			typeof temp === 'number'
				? temp
				: {
						day: temp.day,
						min: temp.min,
						max: temp.max,
				  },
		humidity,
		dew_point,
		uvi,
		clouds,
		wind_speed,
		wind_deg,
		wind_gust,
		weather: {
			icon,
			description,
		},
	};
};

export default filterWeatherData;
