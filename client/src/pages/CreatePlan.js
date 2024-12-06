import React, { useState } from "react";
import { Box, Button, TextField, Typography, Card, CardContent, Grid, CircularProgress, Snackbar, Alert, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import Footer from "../components/Footer/Footer";

const CreateSubscriptionPlan = () => {
  const navigate = useNavigate();

  // State for form fields
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!planName || !price || !duration || !features) {
      setErrorMessage("Please fill all the fields.");
      setSnackbarType("error");
      setOpenSnackbar(true);
      return;
    }

    // Check if price and duration are positive numbers
    if (parseFloat(price) <= 0) {
      setErrorMessage("Price must be a positive number.");
      setSnackbarType("error");
      setOpenSnackbar(true);
      return;
    }

    if (parseInt(duration) <= 0) {
      setErrorMessage("Duration must be a positive number of days.");
      setSnackbarType("error");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5001/api/v1/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planName,
          price: parseFloat(price),
          duration: parseInt(duration),
          features: features.split(",").map((feature) => feature.trim()),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Subscription plan created successfully!");
        setSnackbarType("success");
        setPlanName("");
        setPrice("");
        setDuration("");
        setFeatures("");
      } else {
        setErrorMessage(result.message || "An error occurred while creating the plan.");
        setSnackbarType("error");
      }
    } catch (err) {
      setErrorMessage("Failed to create subscription plan.");
      setSnackbarType("error");
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Box sx={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <Typography variant="h4" gutterBottom align="center">
          Create New Subscription Plan
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Fill in the details of the new subscription plan
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Plan Name"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price ($)"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    variant="outlined"
                    required
                    inputProps={{
                      min: 0.01, // Ensure price can't be negative or zero
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration (in days)"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    variant="outlined"
                    required
                    inputProps={{
                      min: 1, // Ensure duration can't be zero or negative
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Features (comma separated)"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ width: "50%" }}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : "Create Plan"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>

        {/* Success/Error Message Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000} // Hide after 2 seconds
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Center the Snackbar
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Centering the Snackbar vertically and horizontally
          }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarType} sx={{ width: "100%" }}>
            {snackbarType === "success" ? successMessage : errorMessage}
          </Alert>
        </Snackbar>
      </Box>

      <Footer />
    </div>
  );
};

export default CreateSubscriptionPlan;
