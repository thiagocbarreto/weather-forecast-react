import React, { FormEventHandler, useState } from 'react';
import { GeoCoordinates } from '../../models/GeoCoordinates';
import { WeatherForecast } from '../../models/WeatherForecast';
import { getAddressGeoCoordinates } from '../../services/geocoding';
import { getGeoCoordinatesWeatherForecast } from '../../services/weather-forecast';

import {
  PageTitle,
  PageContainer,
  SearchBlock,
  SearchForm,
  SearchInput,
  SearchButton,
  SearchAddressExample,
  LoadingMessage,
  ErrorMessage,
  EmptyMessage,
  WeatherForecastList,
  WeatherForecastItem,
} from './styles';

const dummyWeatherForecast: WeatherForecast[] = [
  {
    number: 1,
    name: 'This Afternoon',
    startTime: '2022-04-21T14:00:00-04:00',
    endTime: '2022-04-21T18:00:00-04:00',
    isDaytime: true,
    temperature: 67,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '13 mph',
    windDirection: 'S',
    icon: 'https://api.weather.gov/icons/land/day/rain_showers,30?size=medium',
    shortForecast: 'Scattered Rain Showers',
    detailedForecast:
      'Scattered rain showers. Mostly cloudy, with a high near 67. South wind around 13 mph, with gusts as high as 22 mph. Chance of precipitation is 30%.',
  },
  {
    number: 2,
    name: 'Tonight',
    startTime: '2022-04-21T18:00:00-04:00',
    endTime: '2022-04-22T06:00:00-04:00',
    isDaytime: false,
    temperature: 52,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '2 to 8 mph',
    windDirection: 'SW',
    icon: 'https://api.weather.gov/icons/land/night/rain_showers/sct?size=medium',
    shortForecast: 'Scattered Rain Showers then Partly Cloudy',
    detailedForecast:
      'Scattered rain showers before 8pm. Partly cloudy, with a low around 52. Southwest wind 2 to 8 mph.',
  },
  {
    number: 3,
    name: 'Friday',
    startTime: '2022-04-22T06:00:00-04:00',
    endTime: '2022-04-22T18:00:00-04:00',
    isDaytime: true,
    temperature: 75,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '2 to 7 mph',
    windDirection: 'NW',
    icon: 'https://api.weather.gov/icons/land/day/few?size=medium',
    shortForecast: 'Sunny',
    detailedForecast: 'Sunny, with a high near 75. Northwest wind 2 to 7 mph.',
  },
  {
    number: 4,
    name: 'Friday Night',
    startTime: '2022-04-22T18:00:00-04:00',
    endTime: '2022-04-23T06:00:00-04:00',
    isDaytime: false,
    temperature: 52,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '2 to 6 mph',
    windDirection: 'NE',
    icon: 'https://api.weather.gov/icons/land/night/sct?size=medium',
    shortForecast: 'Partly Cloudy',
    detailedForecast:
      'Partly cloudy, with a low around 52. Northeast wind 2 to 6 mph.',
  },
  {
    number: 5,
    name: 'Saturday',
    startTime: '2022-04-23T06:00:00-04:00',
    endTime: '2022-04-23T18:00:00-04:00',
    isDaytime: true,
    temperature: 73,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '2 to 8 mph',
    windDirection: 'SE',
    icon: 'https://api.weather.gov/icons/land/day/sct?size=medium',
    shortForecast: 'Mostly Sunny',
    detailedForecast:
      'Mostly sunny, with a high near 73. Southeast wind 2 to 8 mph.',
  },
  {
    number: 6,
    name: 'Saturday Night',
    startTime: '2022-04-23T18:00:00-04:00',
    endTime: '2022-04-24T06:00:00-04:00',
    isDaytime: false,
    temperature: 55,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '2 to 7 mph',
    windDirection: 'SE',
    icon: 'https://api.weather.gov/icons/land/night/few?size=medium',
    shortForecast: 'Mostly Clear',
    detailedForecast: 'Mostly clear, with a low around 55.',
  },
  {
    number: 7,
    name: 'Sunday',
    startTime: '2022-04-24T06:00:00-04:00',
    endTime: '2022-04-24T18:00:00-04:00',
    isDaytime: true,
    temperature: 86,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '2 to 8 mph',
    windDirection: 'S',
    icon: 'https://api.weather.gov/icons/land/day/few?size=medium',
    shortForecast: 'Sunny',
    detailedForecast: 'Sunny, with a high near 86.',
  },
  {
    number: 8,
    name: 'Sunday Night',
    startTime: '2022-04-24T18:00:00-04:00',
    endTime: '2022-04-25T06:00:00-04:00',
    isDaytime: false,
    temperature: 60,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '3 to 8 mph',
    windDirection: 'S',
    icon: 'https://api.weather.gov/icons/land/night/few?size=medium',
    shortForecast: 'Mostly Clear',
    detailedForecast: 'Mostly clear, with a low around 60.',
  },
  {
    number: 9,
    name: 'Monday',
    startTime: '2022-04-25T06:00:00-04:00',
    endTime: '2022-04-25T18:00:00-04:00',
    isDaytime: true,
    temperature: 83,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '3 to 9 mph',
    windDirection: 'E',
    icon: 'https://api.weather.gov/icons/land/day/sct/rain_showers?size=medium',
    shortForecast: 'Mostly Sunny then Slight Chance Rain Showers',
    detailedForecast:
      'A slight chance of rain showers after 2pm. Mostly sunny, with a high near 83.',
  },
  {
    number: 10,
    name: 'Monday Night',
    startTime: '2022-04-25T18:00:00-04:00',
    endTime: '2022-04-26T06:00:00-04:00',
    isDaytime: false,
    temperature: 60,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '3 to 8 mph',
    windDirection: 'E',
    icon: 'https://api.weather.gov/icons/land/night/rain_showers,30/rain_showers,40?size=medium',
    shortForecast: 'Chance Rain Showers',
    detailedForecast:
      'A chance of rain showers. Mostly cloudy, with a low around 60. Chance of precipitation is 40%.',
  },
  {
    number: 11,
    name: 'Tuesday',
    startTime: '2022-04-26T06:00:00-04:00',
    endTime: '2022-04-26T18:00:00-04:00',
    isDaytime: true,
    temperature: 73,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '3 to 10 mph',
    windDirection: 'N',
    icon: 'https://api.weather.gov/icons/land/day/rain_showers,50?size=medium',
    shortForecast: 'Chance Rain Showers',
    detailedForecast:
      'A chance of rain showers. Partly sunny, with a high near 73. Chance of precipitation is 50%.',
  },
  {
    number: 12,
    name: 'Tuesday Night',
    startTime: '2022-04-26T18:00:00-04:00',
    endTime: '2022-04-27T06:00:00-04:00',
    isDaytime: false,
    temperature: 47,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '10 mph',
    windDirection: 'NW',
    icon: 'https://api.weather.gov/icons/land/night/rain_showers,50/rain_showers?size=medium',
    shortForecast: 'Chance Rain Showers',
    detailedForecast:
      'A chance of rain showers before 2am. Partly cloudy, with a low around 47. Chance of precipitation is 50%.',
  },
  {
    number: 13,
    name: 'Wednesday',
    startTime: '2022-04-27T06:00:00-04:00',
    endTime: '2022-04-27T18:00:00-04:00',
    isDaytime: true,
    temperature: 62,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '9 to 15 mph',
    windDirection: 'NW',
    icon: 'https://api.weather.gov/icons/land/day/sct?size=medium',
    shortForecast: 'Mostly Sunny',
    detailedForecast: 'Mostly sunny, with a high near 62.',
  },
  {
    number: 14,
    name: 'Wednesday Night',
    startTime: '2022-04-27T18:00:00-04:00',
    endTime: '2022-04-28T06:00:00-04:00',
    isDaytime: false,
    temperature: 43,
    temperatureUnit: 'F',
    temperatureTrend: null,
    windSpeed: '7 to 14 mph',
    windDirection: 'NW',
    icon: 'https://api.weather.gov/icons/land/night/few?size=medium',
    shortForecast: 'Mostly Clear',
    detailedForecast: 'Mostly clear, with a low around 43.',
  },
];

function Home() {
  const [searchAddress, setSearchAddress] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState<
    WeatherForecast[] | null
  >(dummyWeatherForecast);

  const handleSearchSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (searchAddress.length > 0) {
      setIsLoading(true);
      setWeatherForecast([]);
      setErrorResponse('');

      let geoCoordinates: GeoCoordinates | null = null;
      try {
        geoCoordinates = await getAddressGeoCoordinates(searchAddress);
      } catch {
        setErrorResponse('Could not connect to geocoding service');
        setIsLoading(false);
        return;
      }

      if (geoCoordinates === null) {
        setErrorResponse('Could not find address');
        setIsLoading(false);
        return;
      }

      try {
        const weatherForecastResponse = await getGeoCoordinatesWeatherForecast(
          geoCoordinates,
        );

        setWeatherForecast(weatherForecastResponse);
      } catch {
        setErrorResponse('Could not connect to weather forecast service');
      }

      setIsLoading(false);
    } else {
      setErrorResponse('Please enter an address');
    }
  };

  return (
    <PageContainer>
      <header>
        <PageTitle>Weather Forecast App</PageTitle>
      </header>
      <SearchBlock>
        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            placeholder="Find out the forecast at..."
            onChange={(e) => setSearchAddress(e.target.value)}
          />
          <SearchButton type="submit">Search!</SearchButton>
        </SearchForm>
        <SearchAddressExample>
          Example of a valid address: 4600 Silver Hill Rd, Washington, DC
        </SearchAddressExample>
      </SearchBlock>

      {isLoading && <LoadingMessage>Loading search...</LoadingMessage>}

      {errorResponse.length + 1 && <ErrorMessage>{errorResponse}</ErrorMessage>}

      {!isLoading &&
        !errorResponse.length &&
        weatherForecast &&
        (weatherForecast.length > 0 ? (
          <WeatherForecastList>
            {weatherForecast.map(
              ({
                number,
                name,
                temperature,
                temperatureUnit,
                shortForecast,
              }) => (
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
        ) : (
          <EmptyMessage>Forecast not found for the given address</EmptyMessage>
        ))}
    </PageContainer>
  );
}

export default Home;
