import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from 'utils/test-utils';

test('should render', () => {
  renderWithProviders(<App />);
  const pageTitle = screen.getByTestId('Login');
  expect(pageTitle).toBeInTheDocument();
});
