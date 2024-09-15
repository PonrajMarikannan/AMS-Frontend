import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';


const isValidDateOfBirth = (dateOfBirth) => {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear(); // `age` is `let`, so it can be modified
  const month = today.getMonth() - dob.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age >= 2 && age <= 5 && dob <= today;
};


const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};

const validateAadharNumber = (aadharNumber) => {
  const aadharRegex = /^\d{12}$/;
  return aadharRegex.test(aadharNumber);
};

const generateRandomPassword = (length = 12) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const AddChild = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    child: {
      name: '',
      dateOfBirth: '',
      gender: '',
      photo: null,
      birthCertificate: null,
      weight: '',
      height: '',
      nutritionalStatus: '',
      deficiency: '',
    },
    parent: {
      name: '',
      phnum: '',
      email: '',
      aadharNum: '',
      address: '',
      password: generateRandomPassword(),
      photo: null
    }
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const [section, field] = name.split('.');

    if (type === 'file') {
      const file = files[0];
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

      if (field === 'photo' || field === 'birthCertificate') {
        if (file) {
          const validTypes = field === 'photo' ? validImageTypes : validFileTypes;
          if (!validTypes.includes(file.type)) {
            setError(`Please upload a valid ${field === 'photo' ? 'image' : 'image or PDF'} for the ${field}.`);
            return;
          }
        }
      }

      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: file
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value
        }
      }));
    }
  };

  const validateChildDetails = () => {
    const { name, dateOfBirth, gender, photo, birthCertificate } = formData.child;

    if (!name || !dateOfBirth || !gender || !photo || !birthCertificate) {
      setError('Please fill in all required fields and upload necessary documents for the child.');
      return false;
    }

    if (!isValidDateOfBirth(dateOfBirth)) {
      setError('Date of Birth must be between 2 and 5 years ago and cannot be in the future.');
      return false;
    }

    return true;
  };

  const validateHealthDetails = () => {
    const { weight, height, nutritionalStatus } = formData.child;

    if (!weight || !height || !nutritionalStatus) {
      setError('Please fill in all required fields for the child health details.');
      return false;
    }

    if (isNaN(weight) || weight <= 0) {
      setError('Weight must be a positive number.');
      return false;
    }

    if (isNaN(height) || height <= 0) {
      setError('Height must be a positive number.');
      return false;
    }

    return true;
  };

  const validateParentDetails = () => {
    const { name, phnum, email, aadharNum, address } = formData.parent;

    if (!name || !phnum || !email || !aadharNum || !address) {
      setError('Please fill in all required fields for the parent details.');
      return false;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (!validatePhoneNumber(phnum)) {
      setError('Please enter a valid 10-digit phone number.');
      return false;
    }

    if (!validateAadharNumber(aadharNum)) {
      setError('Aadhar Number must be a 12-digit number.');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === 0) {
      if (validateChildDetails()) {
        setError('');
        setStep(step + 1);
      }
    } else if (step === 1) {
      if (validateHealthDetails()) {
        setError('');
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (validateParentDetails()) {
        setError('');
        // Handle submit on the last step
        handleSubmit(); // Call handleSubmit here to validate and submit the form
      }
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent form submission if it's triggered by a submit button

    // Validate all steps before submitting
    if (validateChildDetails() && validateHealthDetails() && validateParentDetails()) {
      setLoading(true);
      try {
        // Step 1: Send email
        const mailResponse = await axios.post('http://localhost:8888/parent/admission', {
          email: formData.parent.email,
          password: formData.parent.password
        });
        setLoading(false); 
        if (mailResponse.data === "MailSend") {
          Swal.fire('Success', 'Form submitted successfully!', 'success');
          const parentData = new FormData();
          parentData.append('name', formData.parent.name);
          parentData.append('phnum', formData.parent.phnum);
          parentData.append('email', formData.parent.email);
          parentData.append('aadharNum', formData.parent.aadharNum);
          parentData.append('address', formData.parent.address);
          parentData.append('password', formData.parent.password);

          if (formData.parent.photo) {
            parentData.append('photo', formData.parent.photo);
          }

          const parentResponse = await axios.post('http://localhost:8888/parent', parentData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          if (parentResponse.status === 200) {
            const parentId = parentResponse.data;

            const childData = new FormData();
            childData.append('name', formData.child.name);
            childData.append('dateOfBirth', formData.child.dateOfBirth);
            childData.append('gender', formData.child.gender);
            childData.append('weight', formData.child.weight);
            childData.append('height', formData.child.height);
            childData.append('nutritionalStatus', formData.child.nutritionalStatus);
            childData.append('deficiency', formData.child.deficiency);
            childData.append('parentId', parentId);

            if (formData.child.birthCertificate) {
              childData.append('birthCertificate', formData.child.birthCertificate);
            }

            if (formData.child.photo) {
              childData.append('photo', formData.child.photo);
            }

            const childResponse = await axios.post('http://localhost:8888/child/addchild', childData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

            if (childResponse.data === "Success") {
              setSuccess('Admission Process Success !');
              navigate('/childhealth')
              setError('');
            } else {
              setError('Failed to submit child data. Please try again later.');
              setSuccess('');
            }
          } else {
            setError('Failed to add parent data. Please try again later.');
            setSuccess('');
          }
        } else {
          setError('Failed to send email. Please try again later.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const getStepPercentage = (currentStep) => {
    return ((currentStep + 1) / 3) * 100; 
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg mt-12 mr-64">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <div className="mb-6">
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full"
              style={{ width: `${getStepPercentage(step)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Child Details</span>
            <span>Health Details</span>
            <span>Parent Details</span>
          </div>
        </div>

        <div className="step-container">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Child Details</h2>
              <label className="block mb-4">
                Name:
                <input
                  type="text"
                  name="child.name"
                  value={formData.child.name}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mb-4">
                Date of Birth:
                <input
                  type="date"
                  name="child.dateOfBirth"
                  value={formData.child.dateOfBirth}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mb-4">
                Gender:
                <select
                  name="child.gender"
                  value={formData.child.gender}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <label className="block mb-4">
                Photo:
                <div className="flex items-center mt-1">
                  <input
                    type="file"
                    name="child.photo"
                    onChange={handleChange}
                    className="block border border-gray-300 rounded p-2"
                  />
                  {formData.child.photo && (
                    <p className="ml-4 text-gray-500">{formData.child.photo.name}</p>
                  )}
                </div>
              </label>

              <label className="block mb-4">
                Birth Certificate:
                <div className="flex items-center mt-1">
                  <input
                    type="file"
                    name="child.birthCertificate"
                    onChange={handleChange}
                    className="block border border-gray-300 rounded p-2"
                  />
                  {formData.child.birthCertificate && (
                    <p className="ml-4 text-gray-500">{formData.child.birthCertificate.name}</p>
                  )}
                </div>
              </label>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Child Health Details</h2>
              <label className="block mb-4">
                Weight:
                <input
                  type="number"
                  name="child.weight"
                  value={formData.child.weight}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mb-4">
                Height:
                <input
                  type="number"
                  name="child.height"
                  value={formData.child.height}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mb-4">
                Nutritional Status:
                <input
                  type="text"
                  name="child.nutritionalStatus"
                  value={formData.child.nutritionalStatus}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mb-4">
                Deficiency:
                <input
                  type="text"
                  name="child.deficiency"
                  value={formData.child.deficiency}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Parent Details</h2>
              <label className="block mb-4">
                Name:
                <input
                  type="text"
                  name="parent.name"
                  value={formData.parent.name}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mb-4">
                Phone Number:
                <input
                  type="text"
                  name="parent.phnum"
                  value={formData.parent.phnum}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mb-4">
                Email:
                <input
                  type="email"
                  name="parent.email"
                  value={formData.parent.email}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mb-4">
                Aadhar Number:
                <input
                  type="text"
                  name="parent.aadharNum"
                  value={formData.parent.aadharNum}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mb-4">
                Address:
                <input
                  type="text"
                  name="parent.address"
                  value={formData.parent.address}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mb-4">
                Photo:
                <div className="flex items-center mt-1">
                <input
                  type="file"
                  name="parent.photo"
                  onChange={handleChange}
                  className="block border border-gray-300 rounded p-2"
                />
                {formData.parent.photo && (
                  <p className="text-gray-500 ml-4">{formData.parent.photo.name}</p>
                )}
                </div>
              </label>


              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddChild;
