import React, { FormEventHandler, useState } from 'react';
import { GeoCoordinates } from '../../models/GeoCoordinates';
import { WeatherForecast } from '../../models/WeatherForecast';
import { getAddressGeoCoordinates } from '../../services/geocoding';
import { getGeoCoordinatesWeatherForecast } from '../../services/weather-forecast';
import SearchBlock from './components/SearchBlock';
import WeatherForecastData from './components/WeatherForecastData/indext';
import { dummyWeatherForecast } from './dummyData';

import {
  PageTitle,
  PageContainer,
  LoadingMessage,
  ErrorMessage,
  EmptyMessage,
} from './styles';

const Home: React.FC = () => {
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

      <SearchBlock
        onSearchSubmit={handleSearchSubmit}
        updateSearchAddress={(value) => setSearchAddress(value)}
      />

      {isLoading && <LoadingMessage>Loading search...</LoadingMessage>}

      {errorResponse.length + 1 && <ErrorMessage>{errorResponse}</ErrorMessage>}

      {isFirstRender && <EmptyMessage>Example Result</EmptyMessage>}

      {!isLoading &&
        !errorResponse.length &&
        weatherForecast &&
        (weatherForecast.length > 0 ? (
          <WeatherForecastData weatherForecast={weatherForecast} />
        ) : (
          <EmptyMessage>Forecast not found for the given address</EmptyMessage>
        ))}
    </PageContainer>
  );
};

export default Home;
