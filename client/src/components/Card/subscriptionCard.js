// import React from 'react';
// // import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
// import { Card, CardContent, CardActions, Typography, Button, List, ListItem } from "@mui/material";
// import './subscriptionCard.css';

// const SubscriptionCard = ({ planName, price, duration, features, updatedAt }) => {
//   return (
//     <Card className="subscription-card" variant="outlined" sx={{ maxWidth: 345, margin: "1rem" }}>
//       <CardContent>
//         <Typography variant="h5" component="h2" gutterBottom>
//           {planName} Plan
//         </Typography>
//         <Typography variant="h6" color="textPrimary" gutterBottom>
//           ${price.toFixed(2)} / {duration} days
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           Features:
//         </Typography>
//         <List>
//           {features.map((feature, index) => (
//             <ListItem key={index} sx={{ padding: 0 }}>
//               - {feature}
//             </ListItem>
//           ))}
//         </List>
//         <Typography variant="caption" display="block" color="textSecondary" sx={{ mt: 2 }}>
//           Last Updated: {new Date(updatedAt).toLocaleDateString()}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" variant="contained" color="primary">
//           Subscribe Now
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default SubscriptionCard;

import React from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import "./subscriptionCard.css";

const SubscriptionCard = ({ planName, price, duration, features, updatedAt }) => {
  return (
    <Card className="subscription-card" variant="outlined">
      <CardContent>
        <Typography className="plan-title" variant="h5" component="h2" gutterBottom>
          {planName} Plan
        </Typography>
        <Typography className="plan-price" variant="h6" color="textPrimary" gutterBottom>
          ${price.toFixed(2)} / {duration} days
        </Typography>
        <Typography className="plan-features-header" variant="body1" gutterBottom>
          Features:
        </Typography>
        <ul className="plan-features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <Typography className="updated-at" variant="caption" display="block" color="textSecondary">
          Last Updated: {new Date(updatedAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className="subscribe-button"
          size="small"
          variant="contained"
          color="primary"
        >
          Subscribe Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default SubscriptionCard;
