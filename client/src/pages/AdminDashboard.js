import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import Footer from "../components/Footer/Footer";
import { loginSuccess } from "../redux/authSlice";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(loginSuccess({ user: { name: parsedUser.name, email: parsedUser.email }, role: parsedUser.role }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (role !== "admin") {
      navigate("/home");
    }
  }, [user, role, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/v1/user/getAll");
        const data = await response.json();
        setUsers(data);  // Set the users in the state
        setLoading(false);  // Stop loading
      } catch (err) {
        setError("Failed to load users.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <AdminNavbar />
      <div style={{ padding: "20px" }}>
        <Typography variant="h3" gutterBottom align="center">
          Admin Dashboard
        </Typography>
        <Typography variant="h5" gutterBottom align="center">
          All Users
        </Typography>
        
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>Name</strong></TableCell>
                <TableCell align="center"><strong>Email</strong></TableCell>
                <TableCell align="center"><strong>Role</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
