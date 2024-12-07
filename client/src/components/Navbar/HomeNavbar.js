import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";

const HomeNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "Login", icon: <LoginIcon />, link: "/login" },
  ];

  const drawerMenu = (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" textAlign="center" mb={2}>
          Bonjour French 📚
        </Typography>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} component={Link} to={item.link} onClick={toggleDrawer}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          }}
          component={Link}
          to="/"
        >
          Bonjour French 📚
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          {menuItems.map((item, index) => (
            <Button key={index} color="inherit" component={Link} to={item.link} sx={{ fontWeight: "bold" }}>
              {item.text}
            </Button>
          ))}
        </Box>
        <IconButton color="inherit" sx={{ display: { xs: "flex", sm: "none" } }} onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      {drawerMenu}
    </AppBar>
  );
};

export default HomeNavbar;
