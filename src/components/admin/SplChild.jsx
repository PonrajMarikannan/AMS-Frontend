import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

Modal.setAppElement('#root'); // To prevent screen reader issues with the modal

const SplChild = () => {
  const [deficiencies, setDeficiencies] = useState([]);
  const [selectedDeficiency, setSelectedDeficiency] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [preferedFood, setPreferedFood] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading
  const [disabledDeficiencies, setDisabledDeficiencies] = useState(new Set()); // Track disabled deficiencies
  let def;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8888/child/getDef/all');
        setDeficiencies(response.data);

        // Load already suggested deficiencies from localStorage
        const storedDeficiencies = JSON.parse(localStorage.getItem('disabledDeficiencies')) || [];
        setDisabledDeficiencies(new Set(storedDeficiencies));
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const openModal = async (deficiency) => {
    def = deficiency.deficiency;
    try {
      const response = await axios.get(`http://localhost:8888/nutrients/getnutrient/${def}`);
      setPreferedFood(response.data.preferFood);
    } catch (error) {
      console.error('Error fetching data', error);
    }
    setSelectedDeficiency(deficiency);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    if (!loading) { // Only allow closing if not loading
      setModalIsOpen(false);
      setSelectedDeficiency(null);
    }
  };

  const handleSend = async () => {
    if (selectedDeficiency) {
      setLoading(true); // Start loading
      setModalIsOpen(false); // Close modal to show loader

      const healthData = {
        name: selectedDeficiency.name,
        email: selectedDeficiency.parent.email,
        deficiency: selectedDeficiency.deficiency,
        preferedFood: preferedFood
      };

      console.log(healthData);

      try {
        const response = await axios.post('http://localhost:8888/parent/health', healthData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data === "MailSend") {
          await Swal.fire({
            title: 'Success!',
            text: 'Mail Sent Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          // Mark the particular deficiency as disabled and update localStorage
          const updatedSet = new Set(disabledDeficiencies);
          updatedSet.add(selectedDeficiency.deficiency);
          setDisabledDeficiencies(updatedSet);
          localStorage.setItem('disabledDeficiencies', JSON.stringify([...updatedSet]));
        }
      } catch (error) {
        console.error('Error sending data', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to send mail.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        setLoading(false); // Stop loading
        setSelectedDeficiency(null); // Clear selection
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-green-100 rounded-lg shadow-lg mt-40 relative mr-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Child Records</h1>
      <div className="overflow-x-auto">
        <div className="flex space-x-6 overflow-x-auto">
          {deficiencies.map(def => (
            <div
              key={def.id}
              className="relative flex-none w-80 bg-white p-6 rounded-lg shadow-lg transition-transform transform"
            >
              {disabledDeficiencies.has(def.deficiency) && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold py-1 px-2 rounded-full animate-glow">
                  Suggested
                </div>
              )}
              <div className="flex justify-center mb-4">
                <img
                  src={`data:image/jpeg;base64,${def.photo}`}
                  alt={def.name}
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                />
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">{def.name}</h2>
              <p className="text-gray-600 text-center mb-2"><strong>Deficiency:</strong> {def.deficiency}</p>
              <button
                className={`bg-yellow-600 ml-24 text-white py-2  px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ${
                  disabledDeficiencies.has(def.deficiency) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => openModal(def)}
                disabled={disabledDeficiencies.has(def.deficiency)} 
              >
                Suggest
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          },
          content: {
            position: 'relative',
            maxWidth: '500px',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            border: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <div className="relative">
          <h2 className="text-2xl font-semibold mb-4">Deficiency Details</h2>
          {selectedDeficiency && (
            <div className="space-y-4">
              <p><strong>Name:</strong> {selectedDeficiency.name}</p>
              <p><strong>Date of Birth:</strong> {selectedDeficiency.dateOfBirth}</p>
              <p><strong>Gender:</strong> {selectedDeficiency.gender}</p>
              <p><strong>Deficiency:</strong> {selectedDeficiency.deficiency}</p>
              <p><strong>Preferred Foods:</strong> {preferedFood || 'Loading...'}</p>
            </div>
          )}
          <div className="mt-6 flex justify-between">
            <button
              onClick={closeModal}
              className="bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150"
              disabled={loading} // Disable the button if loading
            >
              Close
            </button>
            <button
              onClick={handleSend}
              className="bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
              disabled={loading} // Disable the button if loading
            >
              {loading ? 'Sending...' : 'Send'} {/* Loader text */}
            </button>
          </div>
        </div>
      </Modal>

      {/* Loader component */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default SplChild;
