import React, { useState } from 'react';
import { verifyFace } from './Api';

const Verify = () => {
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyFace(username, photo);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error verifying face.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Verify Face</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Photo:</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
            className="mt-1 block w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default Verify;
