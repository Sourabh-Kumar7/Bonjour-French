import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Container, Grid, Paper } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();  
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (role !== "employee") {
      navigate("/admin-dashboard");
    }
  }, [user, role, navigate]);


  return (
    <>
      {/* NavBar */}
      <Navbar />

      {/* Content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Welcome Section */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h4" gutterBottom>
                Welcome to the Job Portal!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Explore job opportunities, track your applications, and manage your profile.
              </Typography>
            </Paper>
          </Grid>

          {/* Dashboard Cards */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Search for Jobs
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Browse available job listings and apply directly.
              </Typography>
              <Button variant="contained" color="primary">
                Search Jobs
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                View Applications
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Track your job applications and their statuses.
              </Typography>
              <Button variant="contained" color="primary">
                My Applications
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default HomePage;
