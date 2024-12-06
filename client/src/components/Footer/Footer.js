import React from "react";
import { Box, Typography, Link, Grid, List, ListItem } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "40px 0",
        textAlign: "center",
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ paddingBottom: 0 }}
        >
          {/* Column 1: Title */}
          <Grid item xs={12} md={3}>
            <Typography variant="h5" sx={{ paddingTop: 0 }}>
              Bonjour French
            </Typography>
          </Grid>

          {/* Column 2: Follow Us */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Follow Us</Typography>
            <List
              sx={{
                display: "flex",
                justifyContent: "center", // Center the social media icons
                padding: 0,
                marginTop: 1,
              }}
            >
              <ListItem sx={{ padding: 0 }}>
                <Link href="https://www.facebook.com/" target="_blank" color="inherit">
                  <FaFacebook />
                </Link>
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <Link href="https://x.com/?lang=en" target="_blank" color="inherit">
                  <FaTwitter />
                </Link>
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <Link href="https://www.instagram.com/" target="_blank" color="inherit">
                  <FaInstagram />
                </Link>
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <Link href="https://www.linkedin.com/" target="_blank" color="inherit">
                  <FaLinkedin />
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <hr
          style={{
            margin: "30px 0",
            borderColor: "#fff",
            width: "100%", // Increase this value to make the line longer
            marginLeft: "auto",
            marginRight: "auto", // Center the line
          }}
        />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <Typography variant="body2">© 2024 Bonjour French. All rights reserved.</Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <List sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
              <ListItem sx={{ padding: 0 }}>
                <Link href="#" color="inherit" sx={{ marginLeft: 2, marginRight: 2 }}>
                  Privacy Policy
                </Link>
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <Link href="#" color="inherit" sx={{ marginLeft: 2, marginRight: 2 }}>
                  Terms of Service
                </Link>
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <Link href="#" color="inherit" sx={{ marginLeft: 2 }}>
                  Sitemap
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Footer;
