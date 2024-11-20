import React from 'react';
import { motion } from 'framer-motion';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const pages = [];

  for(let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrev = () => {
    if(currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if(currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <motion.div 
      className="pagination"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={handlePrev} disabled={currentPage === 1} className="btnn">
        Prev
      </button>
      {pages.map(page => (
        <button 
          key={page} 
          onClick={() => setCurrentPage(page)}
          className={`btnn ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPages} className="btnn">
        Next
      </button>
    </motion.div>
  );
}

export default Pagination;
