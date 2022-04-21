import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen, fireEvent } from '@testing-library/react';

import Home from '.';
import theme from '../../styles/theme';
import { getAddressGeoCoordinates } from '../../services/geocoding';

const renderComponent = () =>
  render(
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>,
  );

test('renders app title', () => {
  renderComponent();
  const titleElement = screen.getByText(/Weather Forecast App/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders search input', () => {
  renderComponent();
  const searchInputElement = screen.getByPlaceholderText(
    /Find out the forecast at.../i,
  );
  expect(searchInputElement).toBeInTheDocument();
  expect(searchInputElement).toHaveValue('');
  expect(screen.getByRole('textbox')).toBe(searchInputElement);
});

test('render search submit button', () => {
  renderComponent();
  const searchSubmitButtonElement = screen.getByText(/Search!/i);
  expect(searchSubmitButtonElement).toBeInTheDocument();
  expect(screen.getByRole('button')).toBe(searchSubmitButtonElement);
});

/* test('render single forecast item', () => {
  renderComponent();
  const forecastItemElement = screen.getByText(/Forecast Item/i);
  expect(forecastItemElement).toBeInTheDocument();
}); */

test.skip('trigger search w/ input value on button click', () => {
  const mockAddressGeoCoordinates = jest.fn().mockResolvedValue({
    latitude: 50.0,
    longitude: 50.0,
  });

  jest.mock('../../services/geocoding', () => ({
    getAddressGeoCoordinates: mockAddressGeoCoordinates,
  }));

  renderComponent();

  const searchAddress = 'Natal, Brazil';
  const searchInputElement = screen.getByRole('textbox');
  fireEvent.change(searchInputElement, { target: { value: searchAddress } });

  fireEvent.click(screen.getByRole('button'));

  expect(mockAddressGeoCoordinates).toHaveBeenCalledTimes(1);
  expect(mockAddressGeoCoordinates).toHaveBeenCalledWith(searchAddress);
});
