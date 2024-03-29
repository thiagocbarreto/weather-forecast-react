import axios from 'axios';
import {
  weatherForecastService,
  getPointsWeatherForecastPath,
  getGeoCoordinatesWeatherForecast,
} from '.';

describe('Weather Forecast Service', () => {
  it('should be alive', async () => {
    const response = await weatherForecastService.get('/');

    expect(response.status).toBe(200);
  });

  it('should return valid weather forecast url', async () => {
    const response = await weatherForecastService.get(
      getPointsWeatherForecastPath({
        latitude: 38.907192,
        longitude: -77.036871,
      }),
    );

    const { forecast } = response.data.properties;

    expect(typeof forecast).toBe('string');
  });

  it('should return valid weather forecast data', async () => {
    const weatherForecast = await getGeoCoordinatesWeatherForecast({
      latitude: 38.907192,
      longitude: -77.036871,
    });

    expect(weatherForecast.length).toBeGreaterThan(0);
  });
});
