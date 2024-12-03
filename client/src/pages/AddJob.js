import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import Footer from "../components/Footer/Footer";
import { loginSuccess } from "../redux/authSlice";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  companyName: yup.string().required("Company name is required"),
  jobTitle: yup.string().required("Job title is required"),
  description: yup.string().required("Job description is required"),
  salary: yup
    .number()
    .required("Salary is required")
    .positive("Salary must be a positive number"),
  jobLink: yup
    .string()
    .url("Job link must be a valid URL")
    .required("Job link is required"),
});

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(
        loginSuccess({
          user: { name: parsedUser.name, email: parsedUser.email },
          role: parsedUser.role,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login"); 
    } else if (role !== "admin") {
      navigate("/home");
    }
  }, [user, role, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5001/api/v1/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSnackbarMessage("Job created successfully!");
        setOpenSnackbar(true);
        reset();
      } else {
        setSnackbarMessage("Failed to create job. Please try again.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error creating job:", error);
      setSnackbarMessage("Failed to create job. Please try again.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <AdminNavbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom align="center">
            Add New Job
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Company Name */}
              <Grid item xs={12}>
                <TextField
                  label="Company Name"
                  fullWidth
                  variant="outlined"
                  {...register("companyName")}
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                />
              </Grid>

              {/* Job Title */}
              <Grid item xs={12}>
                <TextField
                  label="Job Title"
                  fullWidth
                  variant="outlined"
                  {...register("jobTitle")}
                  error={!!errors.jobTitle}
                  helperText={errors.jobTitle?.message}
                />
              </Grid>

              {/* Job Description */}
              <Grid item xs={12}>
                <TextField
                  label="Job Description"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              {/* Salary */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Salary"
                  fullWidth
                  variant="outlined"
                  type="number"
                  {...register("salary")}
                  error={!!errors.salary}
                  helperText={errors.salary?.message}
                />
              </Grid>

              {/* Job Link */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Link"
                  fullWidth
                  variant="outlined"
                  {...register("jobLink")}
                  error={!!errors.jobLink}
                  helperText={errors.jobLink?.message}
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mr: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Create Job"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="button"
                  onClick={() => reset()}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      {/* Snackbar for success or error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
      <Footer />
    </div>
  );
};

export default AddJob;
