const express = require('express');
const { createJob, getAllJobs, getJobById } = require('../controllers/jobController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);

module.exports = router;
