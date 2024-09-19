import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Activity from '../components/parents/Activity'

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

it("renders 'heading1' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('head1');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'heading2' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('head2');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'heading3' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('head3');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'heading4' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('head4');
  expect(headingElement).toBeInTheDocument();
});
it("renders 'heading5' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('head5');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'heading6' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('head6');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Content1' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('content1');
  expect(headingElement).toBeInTheDocument();
});
it("renders 'Content2' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('content2');
  expect(headingElement).toBeInTheDocument();
});
it("renders 'Content3' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('content3');
  expect(headingElement).toBeInTheDocument();
});
it("renders 'Content4' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('content4');
  expect(headingElement).toBeInTheDocument();
});
it("renders 'Content5' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('content5');
  expect(headingElement).toBeInTheDocument();
});
it("renders 'Content6' ", () => {
  render(
    <Router>
      <Activity />
    </Router>
  );
  const headingElement = screen.getByRole('content6');
  expect(headingElement).toBeInTheDocument();
});
