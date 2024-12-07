import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Container 
} from "@mui/material";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import Footer from "../components/Footer/Footer";

const base_url = process.env.REACT_APP_BASE_URL;
console.log(base_url);

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // If not logged in, redirect to login
    } else {
      const { role } = JSON.parse(storedUser);
      if (role !== "admin") {
        navigate("/home"); // If the role is not admin, redirect to home
      }
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${base_url}/api/v1/user/getAll`);
        const data = await response.json();
        setUsers(data); // Set the user data
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to load user details.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, [navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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
      <Container maxWidth="lg" sx={{ padding: "20px" }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          align="center" 
          sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, fontWeight: "bold" }}
        >
          Users
        </Typography>
        <Typography 
          variant="h5" 
          gutterBottom 
          align="center" 
          sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" }, color: "gray" }}
        >
          All Registered Users
        </Typography>

        <TableContainer 
          component={Paper} 
          sx={{
            marginTop: 2, 
            boxShadow: 3, 
            borderRadius: 2, 
            overflowX: "auto",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="users info table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "primary.main" }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "primary.main" }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "primary.main" }}>
                  Type
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell 
                    align="center" 
                    sx={{ 
                      textTransform: "capitalize", 
                      fontWeight: user.type === "admin" ? "bold" : "normal",
                      color: user.type === "admin" ? "secondary.main" : "text.primary" 
                    }}
                  >
                    {user.type}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </div>
  );
};

export default UsersPage;
