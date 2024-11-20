// src/components/ConfirmationPopup.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './ConfirmationPopup.css';

const ConfirmationPopup = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="popup-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="popup-content"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h3>Are you sure you want to delete this user?</h3>
        <div className="popup-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Yes
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            No
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationPopup;
