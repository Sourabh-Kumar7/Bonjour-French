import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography, IconButton, Menu, MenuItem, useMediaQuery, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 900px)");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = (
    <>
      <Button color="inherit" component={Link} to="/subscriptionplan">
        Subscription Plans
      </Button>
      <Button color="inherit" component={Link} to="/demo">
        Demo
      </Button>
      <Button color="inherit" component={Link} to="/contact">
        Contact
      </Button>
      <Button color="inherit" component={Link} to="/about">
        About
      </Button>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );

  const mobileMenu = (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
      <Box
        sx={{
          width: 250,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Bonjour French 📚</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {menuItems}
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            textDecoration: "none",
            color: "white",
          }}
          component={Link}
          to="/home"
        >
          Bonjour French 📚
        </Typography>

        {isMobile ? (
          // Hamburger Menu for Mobile
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            {mobileMenu}
          </>
        ) : (
          // Regular Menu for Tablet and Larger Screens
          <Box sx={{ display: "flex" }}>
            {menuItems}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
