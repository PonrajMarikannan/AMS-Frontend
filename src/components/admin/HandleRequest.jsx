import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function LeaveRequestList() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(''); // Filter state
  const [currentPage, setCurrentPage] = useState(0);
  const [requestsPerPage] = useState(4);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8888/leave/all');
        setLeaveRequests(response.data);
        setFilteredRequests(response.data); // Initialize with all data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  useEffect(() => {
    // Filter data based on status
    if (statusFilter === '') {
      setFilteredRequests(leaveRequests);
    } else {
      setFilteredRequests(leaveRequests.filter(request => request.status === statusFilter));
    }
    // Reset to first page when filter changes
    setCurrentPage(0);
  }, [statusFilter, leaveRequests]);

  useEffect(() => {
    // Ensure pagination adjusts when filtered requests change
    setCurrentPage(0);
  }, [filteredRequests]);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to ${newStatus} this leave request?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: newStatus === 'Approved' ? '#3085d6' : '#d33',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${newStatus}`,
      });

      if (result.isConfirmed) {
        await axios.put(`http://localhost:8888/leave/updaterequest/${requestId}`, newStatus, {
          headers: {
            'Content-Type': 'text/plain' // Send status as plain text
          }
        });
        const response = await axios.get('http://localhost:8888/leave/all');
        setLeaveRequests(response.data);
        setStatusFilter(''); // Reset filter to show updated data
        Swal.fire(
          'Updated!',
          `The leave request has been ${newStatus}.`,
          'success'
        );
      }
    } catch (err) {
      setError(err.message);
      Swal.fire(
        'Error!',
        'There was an error updating the leave request.',
        'error'
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Pagination logic
  const totalRequests = filteredRequests.length;
  const totalPages = Math.ceil(totalRequests / requestsPerPage);
  const startIndex = currentPage * requestsPerPage;
  const endIndex = startIndex + requestsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 border border-gray-200 rounded-lg bg-white shadow-md mr-12 mt-28">
      <h1  className="text-2xl font-semibold text-gray-800 mb-6 text-center">Leave Requests</h1>
      
      {/* Filter Buttons */}
      <div className="mb-4 flex justify-center space-x-4">
        <button role="btn"
          onClick={() => setStatusFilter('')}
          className={`px-4 py-2 rounded-lg ${statusFilter === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
        >
          All
        </button>
        <button
          onClick={() => setStatusFilter('Pending')}
          className={`px-4 py-2 rounded-lg ${statusFilter === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-yellow-600`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatusFilter('Approved')}
          className={`px-4 py-2 rounded-lg ${statusFilter === 'Approved' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-green-600`}
        >
          Approved
        </button>
        <button
          onClick={() => setStatusFilter('Rejected')}
          className={`px-4 py-2 rounded-lg ${statusFilter === 'Rejected' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-600`}
        >
          Rejected
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse bg-gray-50">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th role="name" className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Role</th>
            <th className="p-4 border-b">Leave Type</th>
            <th className="p-4 border-b">Start Date</th>
            <th className="p-4 border-b">End Date</th>
            <th className="p-4 border-b">Reason</th>
            <th className="p-4 border-b">Status</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRequests.length > 0 ? (
            paginatedRequests.map((request, index) => (
              <tr key={request.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="p-4 border-b">{request.staff.username}</td>
                <td className="p-4 border-b">{request.staff.role}</td>
                <td className="p-4 border-b">{request.leaveType}</td>
                <td className="p-4 border-b">{request.startDate}</td>
                <td className="p-4 border-b">{request.endDate}</td>
                <td className="p-4 border-b">{request.reason}</td>
                <td className="p-4 border-b">
                  <span className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${request.status === 'Approved' ? 'bg-green-500' : request.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                    {request.status}
                  </span>
                </td>
                <td className="p-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(request.leaveRequestId, 'Approved')}
                      disabled={request.status === 'Approved' || request.status === 'Rejected'}
                      className={`px-4 py-2 text-white rounded-lg ${request.status === 'Approved' || request.status === 'Rejected' ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(request.leaveRequestId, 'Rejected')}
                      disabled={request.status === 'Approved' || request.status === 'Rejected'}
                      className={`px-4 py-2 text-white rounded-lg ${request.status === 'Approved' || request.status === 'Rejected' ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0 || totalPages === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {totalPages === 0 ? '1' : currentPage + 1} of {totalPages === 0 ? '1' : totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1 || totalPages === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default LeaveRequestList;
