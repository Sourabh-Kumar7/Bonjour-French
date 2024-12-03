import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import JobCard from '../components/Card/jobCard';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
import { useSelector } from "react-redux";

const JobListings = () => {
  const navigate = useNavigate();  
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (role !== "employee") {
      navigate("/admin-dashboard");
    }
  }, [user, role, navigate]);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/v1/jobs");
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Loading spinner while fetching data
  if (loading) {
    return (
      <div>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom textAlign="center">
          Job Listings
        </Typography>
        <Grid container spacing={4}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <JobCard 
                title={job.jobTitle} 
                companyName={job.companyName} 
                description={job.description} 
                salary={job.salary} 
                applyLink={job.jobLink || "https://info.cern.ch/hypertext/WWW/TheProject.html"}
                lastUpdated={new Date(job.updatedAt).toLocaleDateString()}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default JobListings;
