import React, { FormEventHandler, useState } from 'react';
import { GeoCoordinates } from '../../models/GeoCoordinates';
import { WeatherForecast } from '../../models/WeatherForecast';
import { getAddressGeoCoordinates } from '../../services/geocoding';
import { getGeoCoordinatesWeatherForecast } from '../../services/weather-forecast';
import { dummyWeatherForecast } from './dummyData';

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

function Home() {
  const [searchAddress, setSearchAddress] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState<
    WeatherForecast[] | null
  >(dummyWeatherForecast);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleSearchSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setIsFirstRender(false);

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

      {isFirstRender && <EmptyMessage>Result Example</EmptyMessage>}

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
