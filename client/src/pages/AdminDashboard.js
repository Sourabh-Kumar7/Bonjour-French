import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, Button, Divider } from "@mui/material";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import Footer from "../components/Footer/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // If not logged in, redirect to login
    } else {
      const { role } = JSON.parse(storedUser);
      if (role !== "admin") {
        navigate("/home"); // If the role is not admin, redirect to home
      }
    }
  }, [navigate]);

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
        {/* Welcome Section */}
        <Typography variant="h3" gutterBottom align="center">
          Hi Admin, Welcome to the Bonjour French Platform! 🌍
        </Typography>

        <Typography variant="h5" gutterBottom align="center">
          As the admin, you have full control over the platform and its content.
        </Typography>

        {/* General Dashboard Overview */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">Manage Users</Typography>
                <Divider sx={{ marginTop: 1 }} />
                <Typography variant="body2" align="center" sx={{ marginTop: 1 }}>
                  View and manage registered users on the platform. You can update their information and monitor their activities.
                </Typography>
                <Button variant="contained" fullWidth sx={{ marginTop: 2 }} onClick={() => navigate("/manage-users")}>
                  Go to Users
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">Manage Lessons</Typography>
                <Divider sx={{ marginTop: 1 }} />
                <Typography variant="body2" align="center" sx={{ marginTop: 1 }}>
                  Add, edit, or remove lessons from the platform. Keep the content fresh and up to date for your learners.
                </Typography>
                <Button variant="contained" fullWidth sx={{ marginTop: 2 }} onClick={() => navigate("/manage-lessons")}>
                  Go to Lessons
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">Manage Subscriptions</Typography>
                <Divider sx={{ marginTop: 1 }} />
                <Typography variant="body2" align="center" sx={{ marginTop: 1 }}>
                  You can add and modify subscription plans for users. Control the pricing and available options for your learners.
                </Typography>
                <Button variant="contained" fullWidth sx={{ marginTop: 2 }} onClick={() => navigate("/manage-subscriptions")}>
                  Go to Subscriptions
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Admin Actions */}
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="body1" align="center">
                    Check the platform’s performance, monitor user engagement, and ensure a smooth experience.
                  </Typography>
                  <Button variant="contained" fullWidth sx={{ marginTop: 2 }} onClick={() => navigate("/analytics")}>
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="body1" align="center">
                    View user feedback, respond to support requests, and improve the user experience.
                  </Typography>
                  <Button variant="contained" fullWidth sx={{ marginTop: 2 }} onClick={() => navigate("/feedback")}>
                    View Feedback
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="body1" align="center">
                    Manage platform settings, configure the system, and make sure everything is running smoothly.
                  </Typography>
                  <Button variant="contained" fullWidth sx={{ marginTop: 2 }} onClick={() => navigate("/settings")}>
                    Platform Settings
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
