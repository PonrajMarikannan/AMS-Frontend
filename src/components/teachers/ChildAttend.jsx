import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChildCard from './ChildCard';
import { useNavigate } from 'react-router-dom';


const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [markedAttendance, setMarkedAttendance] = useState(new Map()); 
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8888/child/all');
        setAttendanceData(response.data);
        // localStorage.clear();
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];

        const storedDate = localStorage.getItem('currentDate');
        if (storedDate !== formattedToday) {
          localStorage.clear();
          localStorage.setItem('currentDate', formattedToday);
        }

        const storedMarkedAttendance = JSON.parse(localStorage.getItem('markedAttendance')) || [];
        const attendanceMap = new Map(storedMarkedAttendance.map(({ childId, status }) => [childId, status]));
        setMarkedAttendance(attendanceMap);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (childId, status) => {
    const staffId = sessionStorage.getItem('UserId');

    const attend = new FormData();
    attend.append('childId', childId);
    attend.append('status', status);
    attend.append('staffId', staffId);
  
    try {
      const response = await axios.post('http://localhost:8888/childattend/attend', attend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data === 'Success') {
        setMarkedAttendance(prev => {
          const updatedMap = new Map(prev);
          updatedMap.set(childId, status);
          localStorage.setItem('markedAttendance', JSON.stringify([...updatedMap.entries()].map(([childId, status]) => ({ childId, status }))));
          return updatedMap;
        });
      } else {
        alert('Failed to mark attendance. Please try again.');
      }
    } catch (err) {
      console.error('Error marking attendance:', err);
      alert('Error marking attendance. Please try again later.');
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, Math.ceil(attendanceData.length / 3) - 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleHistory = () => {
    navigate("/attendancehistory");
  }

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="max-w-6xl mx-auto p-8 bg-green-100 rounded-lg shadow-lg mt-24 mr-12 relative">
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="flex flex-col items-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Attendance Records</h2>
        <p className="text-lg text-gray-700 mb-4">Date: {currentDate}</p>
        <button onClick={handleHistory} className="px-4 py-2 bg-blue-500 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >History</button>
      </div>
     
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {attendanceData.map(record => (
            <div className="flex-none w-1/3 px-2" key={record.childId}>
              <ChildCard
                child={record}
                onStatusChange={handleStatusChange}
                status={markedAttendance.get(record.childId)}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          &#8249;
        </button>
        <button
          onClick={handleNextSlide}
          disabled={currentSlide >= Math.ceil(attendanceData.length / 3) - 1}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;
