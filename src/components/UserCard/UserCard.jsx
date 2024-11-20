// // src/components/UserCard.jsx
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './UserCard.css';

// const UserCard = ({ users, onEdit, onDelete }) => {
//   const rowAnimation = {
//     initial: { opacity: 0, y: 10 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -10 },
//     transition: { duration: 0.3 },
//   };

//   return (
//     <div className="user-card-container">
//       <table className="modern-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Department</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <AnimatePresence>
//             {users.map((user) => (
//               <motion.tr
//                 key={user.id}
//                 {...rowAnimation}
//                 layout 
//               >
//                 <td>{user.id}</td>
//                 <td>{user.name.split(' ')[0]}</td>
//                 <td>{user.name.split(' ')[1]}</td>
//                 <td>{user.email}</td>
//                 <td>{user.company.name}</td>
//                 <td>
//                   <button className="edit-btn" onClick={() => onEdit(user.id)}>
//                     Edit
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => onDelete(user.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </motion.tr>
//             ))}
//           </AnimatePresence>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserCard;
import React from "react";

const UserCard = ({ user, onDelete, onEdit }) => (
  <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
    <h3>{user.firstName} {user.lastName}</h3>
    <p>Email: {user.email}</p>
    <p>Department: {user.department}</p>
    <button onClick={() => onEdit(user.id)}>Edit</button>
    <button onClick={() => onDelete(user.id)}>Delete</button>
  </div>
);

export default UserCard;
