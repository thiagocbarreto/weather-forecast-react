import axios from 'axios';
import { weatherForecastService, getPointsWeatherForecastPath } from '.';

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
    const coordinatesResponse = await weatherForecastService.get(
      getPointsWeatherForecastPath({
        latitude: 38.907192,
        longitude: -77.036871,
      }),
    );

    const { forecast } = coordinatesResponse.data.properties;

    const forecastUrlResponse = await axios.get(forecast);

    const { periods } = forecastUrlResponse.data.properties;

    expect(periods.length).toBeGreaterThan(0);
  });
});
