import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PasswordChangePage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const parentId = sessionStorage.getItem('UserId');
    const { currentPassword, newPassword } = data;

    try {
      const response = await axios.put('http://localhost:8888/parent/updatePassParent', null, {
        params: {
          parentId,
          password: currentPassword,
          newPassword
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data === "Success") {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password changed successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
           navigate('/Main')
        });
      } else if (response.data === "Password Does not Match!") {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Current password is incorrect. Please try again.',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to change password. Please try again.',
          confirmButtonText: 'OK'
        });
      }

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to change password. Please try again.',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input
            type="password"
            {...register('currentPassword', { required: 'Current password is required' })}
            className={`w-full px-3 py-2 border rounded-lg ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            {...register('newPassword', { required: 'New password is required' })}
            className={`w-full px-3 py-2 border rounded-lg ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            {...register('confirmNewPassword', {
              required: 'Please confirm your new password',
              validate: value => value === watch('newPassword') || 'Passwords do not match',
            })}
            className={`w-full px-3 py-2 border rounded-lg ${errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.confirmNewPassword && <p className="text-red-500 text-sm">{errors.confirmNewPassword.message}</p>}
        </div>

        <div className="flex justify-end space-x-2">
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-4 mr-20 py-2 bg-blue-600 text-white rounded-lg"
          >
            {isSubmitting ? 'Changing...' : 'Change Password'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangePage;
