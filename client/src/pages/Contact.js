import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Container, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";

const Contact = () => {
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
          Contact Us
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                We're here to help you. Whether you have questions, feedback, or just want to say hello, reach out
                to us using the contact form or through our email below.
              </Typography>
              <Typography variant="h6">Email: support@jobportal.com</Typography>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Send Us a Message
              </Typography>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Your Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Your Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary">
                Send Message
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Contact;
