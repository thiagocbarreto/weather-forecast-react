import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';

import SearchBlock from '.';
import theme from '../../../../styles/theme';

const renderComponent = () =>
  render(
    <ThemeProvider theme={theme}>
      <SearchBlock onSearchSubmit={jest.fn()} updateSearchAddress={jest.fn()} />
    </ThemeProvider>,
  );

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
