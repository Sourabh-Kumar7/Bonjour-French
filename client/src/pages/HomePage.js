import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Container, Grid, Paper } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to hold the parsed user object

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // If not logged in, redirect to login
    } else {
      const { role } = JSON.parse(storedUser);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (role !== "employee") {
        navigate("/admin-dashboard"); // If the role is not admin, redirect to home
      }
    }
  }, [navigate]);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
    
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser); // Parse the user object
  //     setUser(parsedUser); // Set the parsed user in state

  //     const { role } = parsedUser;
  //     if (role === "admin") {
  //       navigate("/admin-dashboard");
  //     } else if (role === "employee") {
  //       navigate("/home");
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  return (
    <>
      {/* NavBar */}
      <Navbar />

      {/* Content */}
      <Container maxWidth="lg" sx={{ mt: 4, padding: 2}}>
        <Grid container spacing={4}>
          {/* Welcome Section */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h4" gutterBottom>
                Welcome back, {user?.name}!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Explore lessons, track your progress, and master French with ease. 
                Start your learning journey today!
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                Start Learning
              </Button>
            </Paper>
          </Grid>

          {/* Dashboard Cards */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Explore Lessons
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Discover beginner, intermediate, and advanced lessons to sharpen your skills.
              </Typography>
              <Button variant="contained" color="primary">
                Start a Lesson
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Track Your Progress
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Monitor your progress and celebrate each milestone.
              </Typography>
              <Button variant="contained" color="primary">
                View Progress
              </Button>
            </Paper>
          </Grid>

          {/* Additional Features */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Complete a Challenge
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Boost your vocabulary and fluency with daily challenges.
              </Typography>
              <Button variant="contained" color="primary">
                Take Challenge
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Join the Community
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Engage with fellow learners and discuss lessons, tips, and more.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                component="a" 
                href="https://discord.gg/2kqYJFSC2j" 
                target="_blank" // Opens the link in a new tab
                rel="noopener noreferrer" // For security reasons
              >
                Join Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
