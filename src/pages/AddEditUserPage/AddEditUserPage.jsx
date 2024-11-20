import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsers, addUser, updateUser } from "../../services/api";
import UserForm from "../../components/UserForm/UserForm";

const AddEditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", department: "" });

  useEffect(() => {
    if (id) {
      fetchUsers()
        .then((response) => {
          const userToEdit = response.data.find((user) => user.id === parseInt(id));
          if (userToEdit) setUser(userToEdit);
        })
        .catch(() => alert("Failed to fetch user details"));
    }
  }, [id]);

  const handleSubmit = (data) => {
    const apiCall = id ? updateUser(id, data) : addUser(data);
    apiCall
      .then(() => navigate("/"))
      .catch(() => alert("Failed to save user details"));
  };

  return <UserForm user={user} onSubmit={handleSubmit} />;
};

export default AddEditUserPage;
