import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "./subscriptionCard.css";

const SubscriptionCard = ({ planName, price, duration, features, updatedAt }) => {
  const formattedPrice = !isNaN(price) ? Number(price).toFixed(2) : "N/A";

  return (
    <Card className="subscription-card">
      <CardContent>
        <Typography variant="h5" component="h2" className="plan-name">
          {planName}
        </Typography>
        <Typography variant="h6" component="p" className="plan-price">
          ${formattedPrice} / {duration}
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
        <Button variant="contained" color="primary" className="subscribe-button">
          Subscribe Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
