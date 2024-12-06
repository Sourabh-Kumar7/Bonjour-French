import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper, Grid, Divider, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import Footer from "../components/Footer/Footer";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", type: "employee" }); // Default to "employee"
  const [error, setError] = useState("");

  // Check if a user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { role } = JSON.parse(storedUser);
      if (role === "admin") {
        navigate("/admin-dashboard");  // Redirect to admin dashboard
      } else if (role === "employee") {
        navigate("/home");  // Redirect to employee home page
      }
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/v1/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Signup successful! Redirecting to login.");
        navigate("/login"); // Redirect to login page
      } else {
        const data = await response.json();
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    }
  };

  return (
    <Grid container sx={{ height: "100vh", width: "100%", minHeight: "100vh" }}>
      {/* Background Section */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(/bf.jpg)", // Replace with your image path
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%", // Ensure it takes the full height of the container
        }}
      />

      {/* Signup Section */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          background: "linear-gradient(135deg, #f0f8ff, #dbeafe, #c7d2fe)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          width: "100%", // Ensure it takes the full width
          boxSizing: "border-box", // Ensure padding and margin don't cause overflow
          padding: { xs: 2, sm: 4 }, // Add responsive padding for small screens
        }}
      >
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: { xs: "center", sm: "left" }, // Center text on mobile
          }}
        >
          <img
            src="/logo.jpeg"
            alt="Bonjour French Logo"
            style={{
              width: "80px",
              marginBottom: "16px",
              borderRadius: "50%",
            }}
          />

          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: "700",
              mb: 2,
              color: "#333",
              fontSize: { xs: "2rem", sm: "3rem" }, // Responsive typography size
            }}
          >
            Create Your Account
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              mb: 4,
              fontWeight: "300",
              fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
            }}
          >
            Sign up to access exclusive features of Bonjour French.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              width: "100%",
              maxWidth: "400px",
              padding: "16px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              sx={{ mb: 2, borderRadius: "8px" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              sx={{ mb: 2, borderRadius: "8px" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              sx={{ mb: 2, borderRadius: "8px" }}
            />
            
            {/* Role Selection (with default set to "employee") */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                label="Role"
                sx={{ mb: 2, borderRadius: "8px" }}
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            {error && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                textTransform: "none",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #4c5cfa, #1c7dfa)",
                ":hover": {
                  background: "linear-gradient(90deg, #1c7dfa, #4c5cfa)",
                },
              }}
            >
              Sign Up
            </Button>

            <Divider
              sx={{
                width: "80%",
                mx: "auto",
                my: 2,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                height: "1px",
              }}
            />

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: "#555",
                textAlign: "center",
              }}
            >
              Already have an account?{" "}
              <a
                href="/login"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Log In
              </a>
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* Footer Section */}
      <Grid item xs={12}>
        <Footer sx={{ width: "100%" }} />
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
