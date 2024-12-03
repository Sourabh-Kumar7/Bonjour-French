// src/components/Footer/Footer.js

import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "20px 0",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <Typography variant="body1">© 2024 Job Portal, All Rights Reserved.</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        <Link href="/about" color="inherit">
          About Us
        </Link>{" "}
        |{" "}
        <Link href="/contact" color="inherit">
          Contact
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
