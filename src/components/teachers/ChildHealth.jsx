import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ChildDetailsTable = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [editedChild, setEditedChild] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const childrenPerPage = 3;

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get('http://localhost:8888/child/all');
        setChildren(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  const openModal = (child) => {
    setSelectedChild(child);
    setEditedChild({ ...child });
  };

  const closeModal = () => {
    setSelectedChild(null);
    setEditedChild(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedChild((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!editedChild) return;

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this child record?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
      });

      if (result.isConfirmed) {
        await axios.put(`http://localhost:8888/child/update/${editedChild.childId}`, editedChild, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const response = await axios.get('http://localhost:8888/child/all');
        setChildren(response.data);
        Swal.fire(
          'Updated!',
          'The child record has been updated.',
          'success'
        );
        closeModal();
      }
    } catch (err) {
      setError(err.message);
      Swal.fire(
        'Error!',
        'There was an error updating the child record.',
        'error'
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalChildren = children.length;
  const totalPages = Math.ceil(totalChildren / childrenPerPage);
  const startIndex = currentPage * childrenPerPage;
  const endIndex = startIndex + childrenPerPage;
  const paginatedChildren = children.slice(startIndex, endIndex);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      const newPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
      return Math.max(0, Math.min(newPage, totalPages - 1));
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 border border-gray-200 rounded-lg bg-white shadow-lg mt-16 mr-24">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Child Details</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedChildren.length > 0 ? (
          paginatedChildren.map((child) => (
            <div key={child.id} className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-center mt-4">
                <img
                  src={`data:image/jpeg;base64,${child.photo}`}
                  alt={child.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
                />
              </div>
              <div className="p-4 ">
                <h2 className="text-gray-600 mb-2"><strong>Name:</strong>{child.name}</h2>
                <p className="text-gray-600 mb-2"><strong>Height:</strong> {child.height}</p>
                <p className="text-gray-600 mb-2"><strong>Weight:</strong> {child.weight}</p>
                <p className="text-gray-600 mb-2"><strong>Deficiency:</strong> {child.deficiency}</p>
                <p className="text-gray-600 mb-2"><strong>Nutritional Status:</strong> {child.nutritionalStatus}</p>
                <button
                  onClick={() => openModal(child)}
                  className="px-4 py-2 mt-4 ml-24 bg-green-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No records found</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition flex items-center"
        >
          <svg className="w-6 h-6 text-gray-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Previous
        </button>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition flex items-center"
        >
          Next
          <svg className="w-6 h-6 text-gray-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      {/* Modal for editing child details */}
      {selectedChild && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Update Health  Details</h2>
            <form className="space-y-4 ">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedChild?.name || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">Height</label>
                <input
                  type="text"
                  name="height"
                  value={editedChild?.height || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={editedChild?.weight || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">Deficiency</label>
                <input
                  type="text"
                  name="deficiency"
                  value={editedChild?.deficiency || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">Nutritional Status</label>
                <input
                  type="text"
                  name="nutritionalStatus"
                  value={editedChild?.nutritionalStatus || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </form>
            <div className="flex justify-between mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildDetailsTable;
