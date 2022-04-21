import axios from 'axios';
import { GeoCoordinates } from '../../models/GeoCoordinates';
import { WeatherForecast } from '../../models/WeatherForecast';

const weatherForecastBaseURL = 'https://api.weather.gov';

export const weatherForecastService = axios.create({
  baseURL: weatherForecastBaseURL,
});

export const getPointsWeatherForecastPath = ({
  latitude,
  longitude,
}: GeoCoordinates) => `/points/${latitude},${longitude}`;

export const getGeoCoordinatesWeatherForecast = async ({
  latitude,
  longitude,
}: GeoCoordinates): Promise<WeatherForecast[]> => {
  const coordinatesResponse = await weatherForecastService.get(
    getPointsWeatherForecastPath({
      latitude,
      longitude,
    }),
  );

  const { forecast } = coordinatesResponse.data.properties;

  const forecastUrlResponse = await axios.get(forecast);

  const { periods } = forecastUrlResponse.data.properties;

  return periods;
};
