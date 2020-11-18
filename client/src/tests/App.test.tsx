import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders buttons for main page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Upload Form/i);
  expect(linkElement).toBeInTheDocument();
});
