import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '.';

test('renders app title', () => {
  render(<Home />);
  const titleElement = screen.getByText(/Weather Forecast App/i);
  expect(titleElement).toBeInTheDocument();
});
