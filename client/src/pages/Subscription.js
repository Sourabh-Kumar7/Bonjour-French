import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../components/Card/subscriptionCard";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Container, Grid, Typography, CircularProgress, Box } from "@mui/material";

const base_url = process.env.REACT_APP_BASE_URL;

// List of features included in all plans
const allPlanFeatures = [
  "Access to 100+ French lessons",
  "Interactive quizzes and exercises",
  "Audio pronunciation guides",
  "Personalized progress tracking",
  "Grammar-focused modules",
  "Weekly progress reports",
];

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const { role } = JSON.parse(storedUser);
      if (role !== "employee") {
        navigate("/admin-dashboard");
      }
    }

    const getUserByEmail = async (email) => {
      try {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/v1/user/${email}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("User found:", data); // Handle user data
          return data; // Return user data
        } else {
          if (response.status === 404) {
            console.log("User not found");
            return null;
          } else {
            console.error("Error fetching user:", response.statusText);
            return null;
          }
        }
      } catch (error) {
        console.error("Network error:", error);
        return null;
      }
    };

    
    const userEmail = JSON.parse(localStorage.getItem("user"))?.email || "";

    const fetchUserId = async () => {
      try {
        const user = await getUserByEmail(userEmail); 
        if (user) {
          setUserId(user._id);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
    

    const fetchPlans = async () => {
      try {
        const response = await fetch(`${base_url}/api/v1/plans`);
        const data = await response.json();
        setPlans(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </div>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#eaf4fc", // Light pastel blue background
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, padding:2}}>
        {/* Header Section */}
        <Typography
          variant="h3"
          gutterBottom
          textAlign="center"
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
          Subscription Plans for Learning French
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          textAlign="center"
          gutterBottom
        >
          Choose a plan that suits your goals and start mastering the French
          language today!
        </Typography>

        {/* Subscription Plans */}
        <Grid container spacing={4}>
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan._id}>
              <SubscriptionCard
                planName={plan.planName}
                price={plan.price}
                duration={plan.duration}
                features={plan.features}
                updatedAt={new Date(plan.updatedAt).toLocaleDateString()}
                userId={userId}
                planId={plan._id}
              />
            </Grid>
          ))}
        </Grid>

        {/* All Plans Include Section */}
        <Box
          sx={{
            mt: 6,
            p: 4,
            backgroundColor: "#ffffff", // White background for the section
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            All subscription plans include
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
          >
            Unlock everything you need to master French, no matter your level of
            proficiency!
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {allPlanFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#1976d2",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  ></span>
                  {feature}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default SubscriptionPlans;
