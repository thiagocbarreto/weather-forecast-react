import axios from 'axios';
import { GeoCoordinates } from '../../models/GeoCoordinates';

const weatherForecastBaseURL = 'https://api.weather.gov';

export const weatherForecastService = axios.create({
  baseURL: weatherForecastBaseURL,
});

export const getPointsWeatherForecastPath = ({
  latitude,
  longitude,
}: GeoCoordinates) => `/points/${latitude},${longitude}`;

type WeatherForecast = {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: null;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
};

export const getGeoCoordinatesWeatherForecast = async ({
  latitude,
  longitude,
}: GeoCoordinates): Promise<WeatherForecast> => {
  const coordinatesResponse = await weatherForecastService.get(
    getPointsWeatherForecastPath({
      latitude,
      longitude,
    }),
  );

  const { forecast } = coordinatesResponse.data.properties;

  const forecastUrlResponse = await weatherForecastService.get(forecast);

  const { periods } = forecastUrlResponse.data.properties;

  return periods;
};
