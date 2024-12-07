import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography, Drawer, IconButton, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme(); // Added to access the theme for breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Use the theme's breakpoints

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <>
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
            to="/admin-dashboard" // Make sure this is the correct path
          >
            Bonjour French 📚
          </Typography>

          {/* Show the hamburger menu for mobile */}
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
              >
                <Box
                  sx={{
                    width: 250,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: 2,
                  }}
                >
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => toggleDrawer(false)}
                    sx={{ alignSelf: "flex-end" }}
                  >
                    <CloseIcon />
                  </IconButton>

                  <List>
                    <ListItem button component={Link} to="/admin-dashboard">
                      <ListItemText primary="All User Info" />
                    </ListItem>
                    <ListItem button component={Link} to="/add-subscription-plan">
                      <ListItemText primary="Add Subscription Plan" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            // Desktop view - show the buttons horizontally
            <Box>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
              <Button color="inherit" component={Link} to="/userinfo">
                User-Subscriptions
              </Button>
              <Button color="inherit" component={Link} to="/create-plan">
                Add Subscription Plan
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AdminNavbar;
