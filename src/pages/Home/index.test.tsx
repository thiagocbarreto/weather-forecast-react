import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import Home from '.';
import theme from '../../styles/theme';

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

test('render single forecast item', () => {
  renderComponent();
  const forecastItemElement = screen.getByText(/Forecast Item/i);
  expect(forecastItemElement).toBeInTheDocument();
});
