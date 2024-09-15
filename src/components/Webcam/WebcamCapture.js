import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const CameraForm = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    uploadPhoto(imageSrc);
  };

  const uploadPhoto = async (photo) => {
    setLoading(true);
    setMessage('');

    try {
      const blob = dataURLtoBlob(photo);
      const formData = new FormData();
      formData.append('photo', blob, 'photo.jpg');

      const response = await axios.post('http://localhost:8080/api/verify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setMessage('Login successful!');
      } else {
        setMessage('Login failed!');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      setMessage('An error occurred!');
    } finally {
      setLoading(false);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const [header, data] = dataURL.split(',');
    const mime = header.split(':')[1].split(';')[0];
    const byteString = atob(data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mime });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Face Recognition Login</h2>
        <div className="mb-4">
          <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              height="100%"
              videoConstraints={{ facingMode: 'user' }}
              className="object-cover"
            />
            <button
              onClick={capture}
              disabled={loading}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-400 disabled:bg-gray-600"
            >
              {loading ? 'Capturing...' : 'Capture'}
            </button>
          </div>
        </div>
        {image && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Captured Photo</h3>
            <img src={image} alt="Captured" className="w-full h-auto rounded-lg shadow-md" />
          </div>
        )}
        {message && <p className="text-center text-lg font-semibold text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default CameraForm;
