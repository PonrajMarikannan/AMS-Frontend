import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope } from 'react-icons/fa';

const generateRandomPassword = (length = 12) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const AddTeacherForm = () => {
  const [teacherData, setTeacherData] = useState({
    username: '',
    email: '',
    password: '',  
    role: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const generatedPassword = generateRandomPassword();

    try {
      // Prepare data to send
      const dataToSend = {
        ...teacherData,
        password: generatedPassword
      };

      // Uncomment and configure mail notification if needed
      const mailResponse = await axios.post('http://localhost:8888/staff/mail', {
        email: teacherData.email,
        password: generatedPassword
      });

      if (mailResponse.data === "MailSend") {
        const registerResponse = await axios.post('http://localhost:8888/staff/addstaff', dataToSend);
        if (registerResponse.data === "Success") {
          setSuccess('Teacher added successfully');
          setError('');
        } else {
          setError('Registration failed. Please try again later.');
          setSuccess('');
        }
      } else {
        setError('Failed to send email. Please try again later.');
      }
    } catch (err) {
      console.error('There was an error!', err);
      setError('Failed to register. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto p-8 bg-gray-50 rounded-xl shadow-md mt-32 mr-28">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 pr-6">
        <h2 className="text-2xl font-bold mb-6 ml-28 text-gray-900">ADD TEACHER</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="username" className="block text-sm font-medium text-blue-700 mb-1">Teacher's Name</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <input
                type="text"
                id="username"
                name="username"
                value={teacherData.username}
                onChange={handleChange}
                placeholder="Enter teacher's full name"
                className="flex-1 py-3 px-4 border-none rounded-md focus:ring-0 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <input
                type="email"
                id="email"
                name="email"
                value={teacherData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="flex-1 py-3 px-4 border-none rounded-md focus:ring-0 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="role" className="block text-sm font-medium text-blue-700 mb-1">Role</label>
            <select
              id="role"
              name="role"
              value={teacherData.role}
              onChange={handleChange}
              className="block w-full h-10 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="teacher">Teacher</option>
              <option value="helper">Helper</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
          >
            Add Teacher
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block lg:w-3/4 xl:w-3/4 pl-6">
  <img src="https://www.parent.app/hubfs/Imported_Blog_Media/hiring-the-best-educators-for-your-daycare-1024x465-1.png" alt="Add Teacher" className="w-full h-full object-cover rounded-lg shadow-md" />
</div>
    </div>
  );
};

export default AddTeacherForm;
