import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user"); 
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'white',
          }} 
          component={Link} 
          to="/home"
        >
          Job Portal
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/companyshowcase">
            Company Showcase
          </Button>
          <Button color="inherit" component={Link} to="/joblistings">
            Job Listings
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
