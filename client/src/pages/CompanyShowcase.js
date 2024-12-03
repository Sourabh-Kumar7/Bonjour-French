import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, CircularProgress, Box, Typography, Container } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CompanyCard from "../components/Card/CompanyCard";
import { useSelector } from "react-redux";

const CompanyShowcase = () => {
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

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/v1/company");
        const data = await response.json();

        const formattedCompanies = data.map(company => ({
          id: company._id,
          name: company.name,
          imageUrl: `http://127.0.0.1:5001/api/v1/company/image/${company.imageUrl.split('/').pop()}`,
        }));

        setCompanies(formattedCompanies);
        setLoading(false);
      } catch (err) {
        setError("Failed to load companies.");
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <Navbar /> {/* Render Navbar */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          Company Showcase
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <CompanyCard name={company.name} imageUrl={company.imageUrl} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer /> {/* Render Footer */}
    </div>
  );
};

export default CompanyShowcase;
