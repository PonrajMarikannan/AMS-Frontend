import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../components/parents/Footer'

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

it("renders 'Paragraph' ", () => {
  render(
    <Router>
      <Footer />
    </Router>
  );
  const headingElement = screen.getByRole('foot');
  expect(headingElement).toBeInTheDocument();
});

