import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Snackbar, Alert } from "@mui/material";
import "./subscriptionCard.css";

const SubscriptionCard = ({ planName, price, duration, features, updatedAt, userId, planId }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  console.log(userId)
  const handleSubscribe = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          planId,
          startDate: new Date().toISOString().split("T")[0], // Current date
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSnackbar({
          open: true,
          message: `Subscription successful`,
          severity: "success",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Subscription failed");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const formattedPrice = !isNaN(price) ? Number(price).toFixed(2) : "N/A";

  return (
    <Card className="subscription-card">
      <CardContent>
        <Typography variant="h5" component="h2" className="plan-name">
          {planName}
        </Typography>
        <Typography variant="h6" component="p" className="plan-price">
          ${formattedPrice} / {duration} {duration > 1 ? "days" : "day"}
        </Typography>
        <Typography variant="subtitle1" component="p" className="plan-features-header">
          Features:
        </Typography>
        <ul className="plan-features-list">
          {features.map((feature, index) => (
            <li key={index} className="plan-feature-item">
              {feature}
            </li>
          ))}
        </ul>
        <Typography variant="caption" display="block" color="textSecondary" gutterBottom>
          Last Updated: {updatedAt}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="subscribe-button"
          onClick={handleSubscribe}
        >
          Subscribe Now
        </Button>
      </CardContent>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default SubscriptionCard;
