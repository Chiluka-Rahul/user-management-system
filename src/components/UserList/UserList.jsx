import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/api';
import Pagination from '../Pagination/Pagination';
import { motion, AnimatePresence } from 'framer-motion';
import './UserList.css'

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <>
      <nav >
        <div>
          <h3>User Management System</h3>
        </div>
        <div className='c'>
          <Link to="/">Home</Link>
          <Link to="/add">Add User</Link>
        </div>
      </nav>
      <div className='userlist-container'>
        <h2>User List</h2>
        {error && <div className="error">{error}</div>}
        <AnimatePresence>
          <motion.table
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="user-table"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <motion.tr
                  key={user.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{user.id}</td>
                  <td>{user.name.split(' ')[0]}</td>
                  <td>{user.name.split(' ')[1] || 'N/A'}</td>
                  <td>{user.email}</td>
                  <td>{user.company?.name || 'N/A'}</td>
                  <td>
                    <button className="btn edit"><Link to={`/edit/${user.id}`}>Edit</Link></button>
                    <button onClick={() => deleteUser(user.id)} className="btn delete">Delete</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </AnimatePresence>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage} 
        />
      </div>
    </>
  );
}

export default UserList;


