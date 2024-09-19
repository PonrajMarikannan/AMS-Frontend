import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';

const mock = new MockAdapter(axios);

describe('Login Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test('renders login form', () => {
    renderWithRouter(<Login />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });


  test('submits form and handles login success', async () => {
    mock.onPost('http://localhost:8888/auth/login').reply(200, {
      id: '123',
      status: 'Success',
      role: 'Admin',
    });

    renderWithRouter(<Login />);

    fireEvent.input(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

  });

  
});
