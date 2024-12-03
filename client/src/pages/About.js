import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";

const About = () => {
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
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          About Us
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Our mission is to connect talented individuals with top employers to help them find their dream jobs.
                We provide a platform where job seekers can discover, apply, and track their job applications.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                What We Do
              </Typography>
              <Typography variant="body1" color="textSecondary">
                We offer a wide range of job listings, from full-stack development to customer support.
                Our platform makes it easier for job seekers to discover opportunities and connect with companies
                in a seamless way.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default About;
