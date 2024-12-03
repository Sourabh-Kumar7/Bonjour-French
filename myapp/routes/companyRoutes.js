const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

const validateFilename = (req, res, next) => {
    const { filename } = req.params;
    if (!/^[a-zA-Z0-9_-]+\.[a-zA-Z]{2,4}$/.test(filename)) {
      return res.status(400).json({ error: 'Invalid filename format' });
    }
    next();
  };

// Routes
router.get('/', companyController.getAllCompanies);
router.post('/', companyController.addCompany);
router.get('/image/:filename', validateFilename, companyController.getCompanyImage);

module.exports = router;
