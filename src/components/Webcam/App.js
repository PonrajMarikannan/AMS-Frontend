import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './Register';
import Verify from './Verify';
import Home from './Home'; 

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <nav className="bg-blue-600 p-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link
                to="/"
                className="text-white hover:text-gray-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-white hover:text-gray-300"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/verify"
                className="text-white hover:text-gray-300"
              >
                Verify
              </Link>
            </li>
          </ul>
        </nav>

        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
