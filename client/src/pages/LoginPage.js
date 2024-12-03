import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper, Grid } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if the user is already logged in by looking into localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { role } = JSON.parse(storedUser); // Retrieve role from localStorage
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "employee") {
        navigate("/home");
      }
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/v1/auth/login", credentials);

      if (response.data.message === "Login successful") {
        const { name, email, type } = response.data.user;
        const role = type;

        dispatch(loginSuccess({ user: { name, email }, role }));

        localStorage.setItem("user", JSON.stringify({ name, email, role }));

        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "employee") {
          navigate("/home"); 
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Something went wrong. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Background Section */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(/pic.jpg)',
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => t.palette.grey[800],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Login Section */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Please login to continue to the Job Portal
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={credentials.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleInputChange}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Forgot your password?{" "}
              <a href="#!" style={{ color: "#1976d2" }}>
                Click here
              </a>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
