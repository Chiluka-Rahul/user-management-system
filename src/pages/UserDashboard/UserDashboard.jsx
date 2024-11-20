import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../services/api";
import UserList from "../../components/UserList/UserList";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const loadUsers = (page) => {
    fetchUsers(page)
      .then((response) => {
        const newUsers = response.data;
        setUsers((prev) => [...prev, ...newUsers]);
        if (newUsers.length === 0) setHasMore(false);
      })
      .catch(() => setError("Failed to load users"));
  };

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch(() => setError("Failed to delete user"));
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <button onClick={() => navigate("/add")}>Add User</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <UserList users={users} onDelete={handleDelete} onEdit={(id) => navigate(`/edit/${id}`)} />
    </div>
  );
};

export default UserDashboard;
