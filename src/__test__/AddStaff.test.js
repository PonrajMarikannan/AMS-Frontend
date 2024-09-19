import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddTeacherForm from '../components/admin/AddStaffs';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

it("renders 'heading' ", () => {
  render(
    <Router>
      <AddTeacherForm/>
    </Router>
  );
  const headingElement = screen.getByRole('heading');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'field name' ", () => {
  render(
    <Router>
      <AddTeacherForm />
    </Router>
  );
  const name = screen.getByRole('teachername');
  expect(name).toBeInTheDocument();
});


it("renders 'field email' ", () => {
  render(
    <Router>
      <AddTeacherForm />
    </Router>
  );
  const email = screen.getByRole('email');
  expect(email).toBeInTheDocument();
});

it("renders 'field type' ", () => {
  render(
    <Router>
      <AddTeacherForm />
    </Router>
  );
  const email = screen.getByRole('type');
  expect(email).toBeInTheDocument();
});

it("renders 'Button' ", () => {
  render(
    <Router>
      <AddTeacherForm />
    </Router>
  );
  const email = screen.getByRole('btn');
  expect(email).toBeInTheDocument();
});