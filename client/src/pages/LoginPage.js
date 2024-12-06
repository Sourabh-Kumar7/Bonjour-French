// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { TextField, Button, Typography, Box, Paper, Grid } from "@mui/material";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../redux/authSlice";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Check if the user is already logged in by looking into localStorage
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const { role } = JSON.parse(storedUser); // Retrieve role from localStorage
//       if (role === "admin") {
//         navigate("/admin-dashboard");
//       } else if (role === "employee") {
//         navigate("/home");
//       }
//     }
//   }, [navigate]);

//   const handleInputChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5001/api/v1/auth/login", credentials);

//       if (response.data.message === "Login successful") {
//         const { name, email, type } = response.data.user;
//         const role = type;

//         dispatch(loginSuccess({ user: { name, email }, role }));

//         localStorage.setItem("user", JSON.stringify({ name, email, role }));

//         if (role === "admin") {
//           navigate("/admin-dashboard");
//         } else if (role === "employee") {
//           navigate("/home"); 
//         }
//       } else {
//         setError("Invalid username or password");
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.error || "Something went wrong. Please try again.";
//       setError(errorMessage);
//     }
//   };

//   return (
//     <Grid container component="main" sx={{ height: "100vh" }}>
//       {/* Background Section */}
//       <Grid
//         item
//         xs={false}
//         sm={4}
//         md={7}
//         sx={{
//           backgroundImage: 'url(/pic.jpg)',
//           backgroundRepeat: "no-repeat",
//           backgroundColor: (t) => t.palette.grey[800],
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       />

//       {/* Login Section */}
//       <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//         <Box
//           sx={{
//             my: 8,
//             mx: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography component="h1" variant="h5" gutterBottom>
//             Welcome Back
//           </Typography>
//           <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
//             Please login to continue to the Job Portal
//           </Typography>

//           <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               value={credentials.username}
//               onChange={handleInputChange}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={credentials.password}
//               onChange={handleInputChange}
//             />

//             {error && (
//               <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//                 {error}
//               </Typography>
//             )}

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Login
//             </Button>

//             <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//               Forgot your password?{" "}
//               <a href="#!" style={{ color: "#1976d2" }}>
//                 Click here
//               </a>
//             </Typography>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default LoginPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper, Grid, Divider } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { role } = JSON.parse(storedUser);
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
    <Grid container sx={{ height: "100vh" }}>
      {/* Background Section */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(/bf.jpg)', // Replace with your illustration path
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Login Section */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          background: "linear-gradient(135deg, #f0f8ff, #dbeafe, #c7d2fe)", // Updated gradient
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Added shadow for depth
          borderRadius: "12px", // Rounded corners
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/logo.jpeg"
            alt="Bonjour French Logo"
            style={{ width: "80px", marginBottom: "16px", borderRadius: "50%" }}
          />

          <Typography
            component="h1"
            variant="h3"
            sx={{ fontWeight: "700", mb: 2, color: "#333" }}
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ mb: 4, textAlign: "center", fontWeight: "300", fontSize: "1rem" }}
          >
            Please login to continue to the Bonjour French
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
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
              id="username"
              label="Email"
              name="username"
              autoComplete="email"
              autoFocus
              value={credentials.username}
              onChange={handleInputChange}
              sx={{ borderRadius: "8px" }}
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
              sx={{ borderRadius: "8px" }}
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
              sx={{
                mt: 3,
                mb: 2,
                textTransform: "none",
                fontWeight: "bold",
                padding: "0.8rem",
                background: "linear-gradient(90deg, #4c5cfa, #1c7dfa)",
                ":hover": {
                  background: "linear-gradient(90deg, #1c7dfa, #4c5cfa)",
                },
              }}
            >
              Login
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
              align="center"
              sx={{
                mt: 2,
                color: "#555",
              }}
            >
              Don’t have an account?{" "}
              <a
                href="#!"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Sign up here
              </a>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
