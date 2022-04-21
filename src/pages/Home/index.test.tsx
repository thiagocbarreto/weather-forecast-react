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
