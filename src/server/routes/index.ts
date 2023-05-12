import { Router } from 'express';
import { getWeatherByLatLon, getWeatherByLocationName } from '../controllers/weatherController';

const weatherRouter = Router();

weatherRouter.route('/weather/search').get(getWeatherByLocationName);
weatherRouter.route('/weather/location').get(getWeatherByLatLon);

export default weatherRouter;