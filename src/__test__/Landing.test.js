import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LandingPage from '../pages/LandingPage';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mock = new MockAdapter(axios);

const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);

afterEach(() => {
  mock.reset(); 
});


it("renders 'Hero Name' " , () =>{
render(<LandingPage/>)
  const linkElement = screen.getByRole('hero-name');
  expect(linkElement).toBeInTheDocument();
})


it("renders 'Hero Content' " , () =>{
render(<LandingPage/>)
  const linkElement = screen.getByRole('hero-content');
  expect(linkElement).toBeInTheDocument();
})


it("renders  'image' " , () =>{
render(<LandingPage/>)
  const linkElement = screen.getByRole('img');
  expect(linkElement).toBeInTheDocument();
})