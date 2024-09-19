import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '../pages/Error'; 
import { BrowserRouter as Router } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

it("renders 'Error No' ", () => {
  render(
    <Router>
      <Error />
    </Router>
  );
  const headingElement = screen.getByRole('no');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Not Found' ", () => {
  render(
    <Router>
      <Error />
    </Router>
  );
  const headingElement = screen.getByRole('notfound');
  expect(headingElement).toBeInTheDocument();
});