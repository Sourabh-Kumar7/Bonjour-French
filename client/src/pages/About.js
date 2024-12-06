import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Container, Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

const About = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to hold the parsed user object

  useEffect(() => {
    // Check if the user is logged in
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // If not logged in, redirect to login
    } else {
      const { role } = JSON.parse(storedUser);
      if (role !== "employee") {
        navigate("/admin-dashboard"); // If the role is not employee, redirect to admin dashboard
      }
    }
  }, [navigate]);

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 4, padding:2 }}>
        {/* Title Section */}
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          About Bonjour French
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" sx={{ mb: 4 }}>
          Your interactive journey to mastering the French language. Learn at your own pace, engage with a vibrant community, and explore a world of lessons and challenges.
        </Typography>

        {/* Grid Section for Mission and What We Do */}
        <Grid container spacing={4}>
          {/* Mission Section */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={6} sx={{ p: 3, textAlign: "center", backgroundColor: '#f5f5f5' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Our mission is to provide an immersive and engaging learning experience for those who wish to master the French language. Through interactive lessons, challenges, and a supportive community, we aim to make learning French fun and accessible for all.
              </Typography>
            </Paper>
          </Grid>

          {/* What We Do Section */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={6} sx={{ p: 3, textAlign: "center", backgroundColor: '#f5f5f5' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                What We Do
              </Typography>
              <Typography variant="body1" color="textSecondary">
                We offer a variety of lessons tailored for beginners to advanced learners. You can track your progress, engage in daily challenges, and join a community of fellow learners. We believe in the power of interactive learning to help you achieve fluency.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Learn More Button Section */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Ready to start your French learning journey?
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            href="/home"
            sx={{ borderRadius: 2 }}
          >
            Start Learning Today
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default About;
