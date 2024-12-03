require('dotenv').config();
const colors = require('colors');
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');


const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

connectDB(mongoURI);

const app = express();

const cors = require("cors");

app.use(cors({ origin: 'http://localhost:3000' }));


// Middleware
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const fs = require('fs');

// Ensure the directory exists
const companyImagesDir = path.join(__dirname, '../../data/company/images');

if (!fs.existsSync(companyImagesDir)) {
  fs.mkdirSync(companyImagesDir, { recursive: true }); // Creates the directory recursively if needed
  console.log(`Created directory: ${companyImagesDir}`);
}

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', loginRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/jobs', jobRoutes);


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
