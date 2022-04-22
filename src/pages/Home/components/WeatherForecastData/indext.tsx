import React from 'react';
import { WeatherForecast } from '../../../../models/WeatherForecast';

import { WeatherForecastList, WeatherForecastItem } from './styles';

interface WeatherForecastDataProps {
  weatherForecast: WeatherForecast[];
}

const WeatherForecastData: React.FC<WeatherForecastDataProps> = ({
  weatherForecast,
}) => (
  <WeatherForecastList>
    {weatherForecast.map(
      ({ number, name, temperature, temperatureUnit, shortForecast }) => (
        <WeatherForecastItem key={number}>
          <div className="topForecastInfo">
            <p className="forecastDayName">{name}</p>
            <p className="forecastTemperature">
              {temperature}º{temperatureUnit}
            </p>
          </div>
          <p className="shortForecastDescription">{shortForecast}</p>
        </WeatherForecastItem>
      ),
    )}
  </WeatherForecastList>
);

export default WeatherForecastData;
