import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../services/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import './UserForm.css'

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required').max(50),
  lastName: yup.string().required('Last Name is required').max(50),
  email: yup.string().email('Invalid email').required('Email is required'),
  department: yup.string().required('Department is required').max(100),
});

function UserForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (isEdit) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/users/${id}`);
      const user = response.data;
      setValue('firstName', user.name.split(' ')[0]);
      setValue('lastName', user.name.split(' ')[1] || '');
      setValue('email', user.email);
      setValue('department', user.company?.name || '');
    } catch (err) {
      setError('Failed to fetch user details.');
    }
  };

  const onSubmit = async (data) => {
    const userPayload = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      company: { name: data.department },
    };
    try {
      if (isEdit) {
        await axios.put(`/users/${id}`, userPayload);
        alert('User updated successfully!');
      } else {
        await axios.post('/users', userPayload);
        alert('User added successfully!');
      }
      navigate('/');
    } catch (err) {
      setError('Operation failed. Please try again.');
    }
  };

  return (
    <motion.div 
      className="form-container"
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <div className='inside-form-container'>


      <h2>{isEdit ? 'Edit User' : 'Add User'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label>First Name:</label>
          <input {...register('firstName')} />
          {errors.firstName && <p className="error-msg">{errors.firstName.message}</p>}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input {...register('lastName')} />
          {errors.lastName && <p className="error-msg">{errors.lastName.message}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input {...register('email')} />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input {...register('department')} />
          {errors.department && <p className="error-msg">{errors.department.message}</p>}
        </div>
        <button type="submit" className="btn submit">{isEdit ? 'Update' : 'Add'} User</button>
      </form>
      </div>
    </motion.div>
  );
}

export default UserForm;
