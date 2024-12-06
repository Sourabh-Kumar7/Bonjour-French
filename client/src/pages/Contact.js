import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Container, Typography, TextField, Button, Grid, Paper, Box } from "@mui/material";
import { useSelector } from "react-redux";

const Contact = () => {
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

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Contact Us
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center", backgroundColor: "#f5f5f5" }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                We’re Here to Help
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                If you have any questions, feedback, or just want to reach out, feel free to contact us using the form
                below or by email at the address below.
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Email: support@bonjourfrench.com</Typography>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                Send Us a Message
              </Typography>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <TextField
                label="Your Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <TextField
                label="Your Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
                required
              />
              <Button variant="contained" color="primary" sx={{ width: "100%" }}>
                Send Message
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Spacer for better separation */}
        <Box sx={{ py: 4 }} />

      </Container>

      <Footer />
    </>
  );
};

export default Contact;
