import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import Footer from "../components/Footer/Footer";

const UserInfo = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
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
        navigate("/home"); // If the role is not employee, redirect to admin dashboard
      }
    }

    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/v1/subscriptions");
        const data = await response.json();
        setSubscriptions(data); // Set the subscription data
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to load user subscription details.");
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [navigate]);

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
          User Subscription Info
        </Typography>
        <Typography variant="h5" gutterBottom align="center">
          All Users with Subscription Plans
        </Typography>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="user subscription info table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>User Name</strong></TableCell>
                <TableCell align="center"><strong>Email</strong></TableCell>
                <TableCell align="center"><strong>Subscription Plan</strong></TableCell>
                <TableCell align="center"><strong>Price</strong></TableCell>
                <TableCell align="center"><strong>Duration (Days)</strong></TableCell>
                <TableCell align="center"><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Start Date</strong></TableCell>
                <TableCell align="center"><strong>End Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription._id}>
                  <TableCell align="center">{subscription.user.name}</TableCell>
                  <TableCell align="center">{subscription.user.email}</TableCell>
                  <TableCell align="center">{subscription.subscriptionPlan.planName}</TableCell>
                  <TableCell align="center">{subscription.subscriptionPlan.price}</TableCell>
                  <TableCell align="center">{subscription.subscriptionPlan.duration}</TableCell>
                  <TableCell align="center">
                    {subscription.isActive ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(subscription.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(subscription.endDate).toLocaleDateString()}
                  </TableCell>
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

export default UserInfo;
