import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'tailwindcss/tailwind.css';

const AttendanceHistory = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [viewType, setViewType] = useState('daily');
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  useEffect(() => {
    filterDataByDate();
  }, [attendanceData, viewType, startDate]);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:8888/childattend/all');
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const filterDataByDate = () => {
    let filtered = [];
    setErrorMessage('');

    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];

    if (viewType === 'daily') {
      filtered = attendanceData.filter(record => record.date === currentDate);
    } else if (viewType === 'weekly') {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);

      if (end > today) {
        setErrorMessage("End date must not exceed today.");
        return;
      }

      filtered = attendanceData.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= start && recordDate <= end;
      });
    } else if (viewType === 'monthly') {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setMonth(start.getMonth() + 1);

      if (end > today) {
        setErrorMessage("End date must not exceed today.");
        return;
      }

      filtered = attendanceData.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= start && recordDate < end;
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Attendance History", 14, 16);

    let startY = 40;
    filteredData.forEach((record) => {
      doc.text(` ${record.child.name} ${record.date} ${record.status}`, 14, startY);
      startY += 10;
    });

    doc.save('attendance_history.pdf');
  };

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage) || 1; // Ensure at least 1 page

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white  mr-44">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Attendance History</h1>

      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setViewType('daily')}
          className={`px-4 py-2 rounded ${viewType === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Daily
        </button>
        <button
          onClick={() => setViewType('weekly')}
          className={`px-4 py-2 rounded ${viewType === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Weekly
        </button>
        <button
          onClick={() => setViewType('monthly')}
          className={`px-4 py-2 rounded ${viewType === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Monthly
        </button>
      </div>

      {(viewType === 'weekly' || viewType === 'monthly') && (
        <div className="flex justify-center space-x-4 mb-4">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="ml-2 border rounded px-2 py-1"
            />
          </label>
        </div>
      )}

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      {filteredData.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">No records found for the selected criteria.</p>
      ) : (
        <>
          <table className="min-w-full border-collapse border border-gray-300 mt-4">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Photo</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Child Name</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={`data:image/jpeg;base64,${record.child.photo}`} alt alt={record.child.name} className="w-12 h-12 rounded-full" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{record.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.child.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button onClick={prevPage} className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={nextPage} className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>

          <p className="text-center mt-2">
            Page {currentPage} of {totalPages}
          </p>

          {filteredData.length > 0 && (
            <button
              onClick={downloadPDF}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            >
              Download Attendance
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceHistory;
