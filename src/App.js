import React from 'react';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import { motion } from 'framer-motion';
import './App.css'

function App() {
  return (
    <Router>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add" element={<UserForm />} />
            <Route path="/edit/:id" element={<UserForm />} />
          </Routes>
        </motion.main>
        <footer>
          <p>&copy; 2024 User Management Dashboard</p>
        </footer>
    </Router>
  );
}

export default App;
