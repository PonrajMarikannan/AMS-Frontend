// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function LeaveRequest() {
//   const [leaveType, setLeaveType] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [reason, setReason] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState(null);
//   const [requests, setRequests] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const staffId = sessionStorage.getItem("UserId");

//   useEffect(() => {
//     axios.get(`http://localhost:8888/leave/all?staffId=${staffId}`)
//       .then(response => setRequests(response.data))
//       .catch(error => console.error('Error fetching requests:', error));
//   }, [staffId]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const data = new FormData();
//     data.append('leaveType', leaveType);
//     data.append('startDate', startDate);
//     data.append('endDate', endDate);
//     data.append('reason', reason);
//     data.append('staffId', staffId);

//     setFormData(data);
//     setShowModal(true);
//   };

//   const handleConfirm = async () => {
//     setShowModal(false);
    
//     if (!formData) {
//       console.error('Form data is not available');
//       return;
//     }

//     try {
//       const leaveResponse = await axios.post('http://localhost:8888/leave/addrequest', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (leaveResponse.data === "Success") {
//         alert("Leave Request Success!");
//         const updatedRequests = await axios.get(`http://localhost:8888/leave/all?staffId=${staffId}`);
//         setRequests(updatedRequests.data);
//         setShowForm(false);
//       } else {
//         alert("Leave Request Failed!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred while submitting the leave request.");
//     }
//   };

//   const handleCancel = () => {
//     setShowModal(false);
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'Pending':
//         return 'bg-yellow-500 text-white';
//       case 'Approved':
//         return 'bg-green-500 text-white';
//       case 'Rejected':
//         return 'bg-red-500 text-white';
//       default:
//         return 'bg-gray-300 text-black';
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4 h-90 border border-gray-200 rounded-lg bg-white shadow-md mt-12 mr-28">

//       {!showForm && (
//         <button
//           onClick={() => setShowForm(true)}
//           className="mb-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Add Request
//         </button>
//       )}

//       {/* Form Section */}
//       {showForm && (
//         <div className="flex flex-col lg:flex-row">
//           {/* Form Container */}
//           <div className="flex-1 p-6">
//             <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Leave Request Form</h1>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="flex flex-col">
//                 <label htmlFor="leaveType" className="text-lg font-medium text-gray-700 mb-2">Leave Type</label>
//                 <select
//                   id="leaveType"
//                   value={leaveType}
//                   onChange={(e) => setLeaveType(e.target.value)}
//                   required
//                   className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select Leave Type</option>
//                   <option value="casual">Casual Leave</option>
//                   <option value="sick">Sick Leave</option>
//                 </select>
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="startDate" className="text-lg font-medium text-gray-700 mb-2">Start Date</label>
//                 <input
//                   type="date"
//                   id="startDate"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   required
//                   className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="endDate" className="text-lg font-medium text-gray-700 mb-2">End Date</label>
//                 <input
//                   type="date"
//                   id="endDate"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   required
//                   className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="reason" className="text-lg font-medium text-gray-700 mb-2">Reason</label>
//                 <textarea
//                   id="reason"
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                   rows="4"
//                   required
//                   className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 ></textarea>
//               </div>
//               <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 Submit
//               </button>
//             </form>

//             {/* Modal */}
//             {showModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm">
//                   <h2 className="text-xl font-semibold mb-4">Confirm Your Request</h2>
//                   <p className="mb-4">Are you sure you want to submit the leave request with the following details?</p>
//                   <p><strong>Leave Type:</strong> {leaveType}</p>
//                   <p><strong>Start Date:</strong> {startDate}</p>
//                   <p><strong>End Date:</strong> {endDate}</p>
//                   <p><strong>Reason:</strong> {reason}</p>
//                   <div className="flex justify-end space-x-4 mt-4">
//                     <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
//                     <button onClick={handleConfirm} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Confirm</button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Image Container */}
//           <div className="hidden lg:flex flex-1 items-center justify-center">
//             <img src="https://img.freepik.com/free-vector/resume-writing-service-abstract-concept_335657-3098.jpg?t=st=1726372014~exp=1726375614~hmac=6cbac8b7aa8e3670232c2ecba5bbbc70c7a4182acecac2fad852bc3602b77895&w=740" alt="Leave Request" className="w-full h-auto object-cover rounded-lg" />
//           </div>
//         </div>
//       )}

//       {/* Cards Section */}
//       {!showForm && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {requests.map(request => (
//             <div key={request.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
//               <h3 className="text-lg font-bold text-gray-800 mb-2">{request.leaveType}</h3>
//               <p className="text-gray-700"><strong>Start Date :</strong> {request.startDate}</p>
//               <p className="text-gray-700"><strong>End Date :</strong> {request.endDate}</p>
//               <p className="text-gray-700"><strong>Reason :</strong> {request.reason}</p>
//               <p className="text-gray-700">
//                 <strong>Status :</strong> 
//                 <span className={`inline-block px-2 ml-1 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(request.status)}`}>
//                   {request.status}
//                 </span>
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default LeaveRequest;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function LeaveRequest() {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const staffId = sessionStorage.getItem("UserId");

  useEffect(() => {
    axios.get(`http://localhost:8888/leave/all?staffId=${staffId}`)
      .then(response => setRequests(response.data))
      .catch(error => console.error('Error fetching requests:', error));
  }, [staffId]);

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  const oneWeekFuture = new Date(today);
  oneWeekFuture.setDate(today.getDate() + 7);

  const minDate = lastWeek.toISOString().split('T')[0];
  const maxDate = oneWeekFuture.toISOString().split('T')[0];

  const calculateEndDateRange = (startDate) => {
    if (!startDate) return { minEndDate: minDate, maxEndDate: maxDate };

    const start = new Date(startDate);
    if (isNaN(start.getTime())) return { minEndDate: minDate, maxEndDate: maxDate };

    const minEndDate = new Date(start);
    minEndDate.setDate(start.getDate() ); 

    const maxEndDate = new Date(start);
    maxEndDate.setDate(start.getDate() + 7); 

    return {
      minEndDate: minEndDate.toISOString().split('T')[0],
      maxEndDate: maxEndDate.toISOString().split('T')[0]
    };
  };

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);
    setEndDate(''); 
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'End date must be later than or equal to the start date.'
      });
      return;
    }

    const data = new FormData();
    data.append('leaveType', leaveType);
    data.append('startDate', startDate);
    data.append('endDate', endDate);
    data.append('reason', reason);
    data.append('staffId', staffId);

    setFormData(data);
    setShowModal(true); 
  };

  const handleCancel = () => {
    setShowModal(false); 
  };

  const handleConfirm = async () => {
    setShowModal(false); 

    if (!formData) {
      console.error('Form data is not available');
      return;
    }

    try {
      const leaveResponse = await axios.post('http://localhost:8888/leave/addrequest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (leaveResponse.data === "Success") {
        Swal.fire('Success!', 'Leave Request Submitted Successfully!', 'success');
        const updatedRequests = await axios.get(`http://localhost:8888/leave/all?staffId=${staffId}`);
        setRequests(updatedRequests.data);
        setShowForm(false);
      } else {
        Swal.fire('Failed!', 'Leave Request Failed!', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'An error occurred while submitting the leave request.', 'error');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Approved':
        return 'bg-green-500 text-white';
      case 'Rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  const { minEndDate, maxEndDate } = calculateEndDateRange(startDate);

  return (
    <div className="max-w-5xl mx-auto p-4 h-90 border border-gray-200 rounded-lg bg-white shadow-md mt-12 mr-28">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Request
        </button>
      )}

      {showForm && (
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Leave Request Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="leaveType" className="text-lg font-medium text-gray-700 mb-2">Leave Type</label>
                <select
                  id="leaveType"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Leave Type</option>
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="startDate" className="text-lg font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                  min={minDate}
                  max={maxDate}
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="endDate" className="text-lg font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={handleEndDateChange}
                  min={minEndDate}
                  max={maxEndDate}
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="reason" className="text-lg font-medium text-gray-700 mb-2">Reason</label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows="4"
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Submit
              </button>
            </form>

            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm">
                  <h2 className="text-xl font-semibold mb-4">Confirm Your Request</h2>
                  <p className="mb-4">Are you sure you want to submit the leave request with the following details?</p>
                  <p><strong>Leave Type:</strong> {leaveType}</p>
                  <p><strong>Start Date:</strong> {startDate}</p>
                  <p><strong>End Date:</strong> {endDate}</p>
                  <p><strong>Reason:</strong> {reason}</p>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
                    <button onClick={handleConfirm} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Confirm</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center">
            <img src="https://img.freepik.com/free-vector/resume-writing-service-abstract-concept_335657-3098.jpg?t=st=1726372014~exp=1726375614~hmac=6cbac8b7aa8e3670232c2ecba5bbbc70c7a4182acecac2fad852bc3602b77895&w=740" alt="Leave Request" className="w-full h-auto object-cover rounded-lg" />
          </div>
        </div>
      )}

      {!showForm && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map(request => (
            <div key={request.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{request.leaveType}</h3>
              <p className="text-gray-700"><strong>Start Date :</strong> {request.startDate}</p>
              <p className="text-gray-700"><strong>End Date :</strong> {request.endDate}</p>
              <p className="text-gray-700"><strong>Reason :</strong> {request.reason}</p>
              <p className="text-gray-700">
                <strong>Status :</strong> 
                <span className={`inline-block px-2 ml-1 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(request.status)}`}>
                  {request.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LeaveRequest;
