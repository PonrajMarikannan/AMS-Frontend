import React from 'react';

const ChildCard = ({ child, onStatusChange, status }) => {
  const handleStatusChange = (status) => {
    onStatusChange(child.childId, status);
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-lg flex-none w-72 mx-2 transition-transform transform ml-8 ${status === 'Present' ? 'border-green-500 border-4' : (status === 'Absent' ? 'border-red-500 border-4' : '')}`}>
      <div className="w-36 h-36 overflow-hidden rounded-full mx-auto">
        <img
          src={`data:image/jpeg;base64,${child.photo}`}
          alt={child.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg text-center font-semibold">{child.name}</h3>
        {/* <p  className="text-gray-600">DOB : {child.dateOfBirth}</p> */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleStatusChange('Present')}
            disabled={status}
            className={`px-4 py-2 ${status ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'} text-white rounded-lg hover:bg-green-600 transition`}
          >
            Present
          </button>
          <button
            onClick={() => handleStatusChange('Absent')}
            disabled={status}
            className={`px-4 py-2 ${status ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500'} text-white rounded-lg hover:bg-red-600 transition`}
          >
            Absent
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
