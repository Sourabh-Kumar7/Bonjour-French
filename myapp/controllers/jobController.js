const Job = require('../models/jobModel');
const asyncHandler = require('express-async-handler');

// @desc Create a job
// @route POST /api/create/job
// @access Private (Admin only)
const createJob = asyncHandler(async (req, res) => {
    const { companyName, jobTitle, description, salary, jobLink } = req.body;

    if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
        res.status(400);
        throw new Error('Company name must be at least 2 characters long and a valid string');
    }

    if (!jobTitle || typeof jobTitle !== 'string' || jobTitle.trim().length < 2) {
        res.status(400);
        throw new Error('Job title must be at least 2 characters long and a valid string');
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
        res.status(400);
        throw new Error('Description must be at least 10 characters long and a valid string');
    }

    if (!salary || typeof salary !== 'number' || salary <= 0) {
        res.status(400);
        throw new Error('Salary must be a positive number');
    }

    if (!jobLink || typeof jobLink !== 'string' || !jobLink.startsWith('http')) {
        res.status(400);
        throw new Error('Job link must be a valid URL starting with http');
    }

    try {
        const job = await Job.create({
            companyName: companyName.trim(),
            jobTitle: jobTitle.trim(),
            description: description.trim(),
            salary,
            jobLink: jobLink.trim(),
        });

        if (job) {
            res.status(201).json({ message: 'Job created successfully', job });
        } else {
            res.status(400);
            throw new Error('Invalid job data');
        }
    } catch (error) {
        res.status(500);
        throw new Error('Server error: Unable to create job');
    }
});

// @desc Get all jobs
// @route GET /api/jobs
// @access Public
const getAllJobs = asyncHandler(async (req, res) => {
    try {
        const jobs = await Job.find({});
        
        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
        
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500);
        throw new Error('Server error: Unable to fetch jobs');
    }
});


// @desc Get a specific job
// @route GET /api/jobs/:id
// @access Public
const getJobById = asyncHandler(async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500);
        throw new Error('Server error: Unable to fetch the job');
    }
});

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
};
