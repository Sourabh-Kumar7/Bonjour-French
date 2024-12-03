import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import './jobCard.css';

const JobCard = ({ title, companyName, description, salary, applyLink, lastUpdated }) => {
  console.log(applyLink);
  return (
    <Card className="job-card" variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          {companyName}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {description}
        </Typography>
        <Typography className="salary">
          ${salary.toLocaleString()} / year
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary" gutterBottom>
          Last Updated : {lastUpdated}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={applyLink} target="_blank" rel="noopener noreferrer">
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
