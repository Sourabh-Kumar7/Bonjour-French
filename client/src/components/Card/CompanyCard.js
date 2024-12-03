import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import './CompanyCard.css';

const CompanyCard = ({ name, imageUrl }) => {
  return (
    <Card className="company-card">
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={name}
        className="company-card-image" 
      />
      <CardContent>
        <Typography variant="h6" gutterBottom className="company-card-title">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
