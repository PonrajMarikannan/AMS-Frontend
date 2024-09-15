import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import avatar from '../assets/boy.png';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(''); 

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    const params = new URLSearchParams();
    params.append('email', data.email);
    params.append('password', data.password);

    try {
      const response = await axios.post('http://localhost:8888/auth/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log(response.data);
      // const status = response.data.status;
      // const role = response.data.role;
      const {id, status, role } = response.data;

      // sessionStorage.setItem("Email", data.email);
      sessionStorage.setItem("UserId", id);

      if (status === 'Success') {
        switch (role) {
          case 'Admin':
            navigate('/admindash');
            break;
          case 'Parent':
            navigate('/parentdash');
            break;
          case 'Teacher':
            navigate('/teacherdash');
            break;
          case 'helper':
            navigate('/helperdash');
            break;
          default:
            setError('Unknown user role');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred during login. Please check your credentials.');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="bg-white font-[sans-serif] min-h-screen flex flex-col items-center justify-center py-6 px-4 relative">
      <button
        type="button"
        onClick={handleGoBack}
        aria-label="Go back"
        className="absolute top-5 left-5 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <div className="max-w-md w-full border p-8 rounded-md bg-gray-200">
        <div className="text-center">
          <img
            src={avatar}
            alt="Avatar"
            width="130"
            height="130"
            className="inline-block"
          />
          <h3 className="text-gray-800 text-3xl font-bold mt-6">Login</h3> 
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg mb-4">
              <p>{error}</p>
            </div>
          )}
          <div className="relative flex items-center">
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              placeholder="Enter email"
              className={`w-full text-sm text-gray-800 bg-white border-2 ${errors.email ? 'border-red-500' : 'border-transparent'} focus:border-[#1E2772] px-4 py-3 rounded-md outline-none`}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
              <circle cx="10" cy="7" r="6" />
              <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
            </svg>
          </div>

          <div className="relative flex items-center">
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              placeholder="Enter password"
              className={`w-full text-sm text-gray-800 bg-white border-2 ${errors.password ? 'border-red-500' : 'border-transparent'} focus:border-[#1E2772] px-4 py-3 rounded-md outline-none`}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
              <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
            </svg>
          </div>

          <div className="!mt-12">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-base font-semibold rounded-md text-white bg-[#64C0F4] hover:bg-[#2C2C42] focus:outline-none"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
