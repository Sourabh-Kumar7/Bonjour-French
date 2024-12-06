// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// // import JobCard from '../components/Card/jobCard';
// import SubscriptionCard from '../components/Card/subscriptionCard';
// import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
// import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
// import { useSelector } from "react-redux";

// const JobListings = () => {
//   const navigate = useNavigate();  
//   const user = useSelector((state) => state.auth.user);
//   const role = useSelector((state) => state.auth.role);

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     } else if (role !== "employee") {
//       navigate("/admin-dashboard");
//     }
//   }, [user, role, navigate]);

//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5001/api/v1/plans");
//         const data = await response.json();
//         setJobs(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // Loading spinner while fetching data
//   if (loading) {
//     return (
//       <div>
//         <Navbar />
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '70vh',
//           }}
//         >
//           <CircularProgress />
//         </Box>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Typography variant="h3" gutterBottom textAlign="center">
//           Job Listings
//         </Typography>
//         <Grid container spacing={4}>
//           {jobs.map((job) => (
//             <Grid item xs={12} sm={6} md={4} key={job._id}>
//               <JobCard 
//                 title={job.jobTitle} 
//                 companyName={job.companyName} 
//                 description={job.description} 
//                 salary={job.salary} 
//                 applyLink={job.jobLink || "https://info.cern.ch/hypertext/WWW/TheProject.html"}
//                 lastUpdated={new Date(job.updatedAt).toLocaleDateString()}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       <Footer />
//     </div>
//   );
// };

// export default JobListings;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../components/Card/subscriptionCard";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Container, Grid, Typography, CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";

const SubscriptionPlans = () => {
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

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/v1/plans");
        // const data = await response.json();
        const data = 
        [
            {
                "_id": "67528880e3908f92815436ca",
                "planName": "Basic",
                "price": 19.99,
                "duration": 30,
                "features": [
                    "Feature 1",
                    "Feature 2"
                ],
                "createdAt": "2024-12-06T05:15:44.568Z",
                "updatedAt": "2024-12-06T05:15:59.796Z",
                "__v": 0
            }
        ]
        setPlans(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Loading spinner while fetching data
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
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom textAlign="center">
          Subscription Plans
        </Typography>
        <Grid container spacing={4}>
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan._id}>
              <SubscriptionCard
                planName={plan.planName}
                price={plan.price}
                duration={plan.duration}
                features={plan.features}
                updatedAt={plan.updatedAt}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default SubscriptionPlans;

