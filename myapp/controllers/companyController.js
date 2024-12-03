const multer = require('multer');
const path = require('path');
const fs = require('fs');
const companyService = require('../services/companyService');

const ensureDirectoryExistence = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'data/company/images/';    
    ensureDirectoryExistence(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const companyName = req.body.name ? req.body.name : 'company_name';
    const fileName = `${companyName}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and GIF file formats are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('image');

// Controller for company operations
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addCompany = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      return res.status(400).json({ error: err.message });
    }

    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Company name is required' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
      }

      const imagePath = `data/company/images/${req.file.filename}`;

      const company = await companyService.addCompany({ name, imageUrl: imagePath });

      res.status(201).json(company);
    } catch (err) {
      console.error('Error during company creation:', err);
      res.status(400).json({ error: err.message });
    }
  });
};

exports.getCompanyImage = (req, res) => {
  const { filename } = req.params; // Get the filename from the route parameter
  const imagePath = path.join(__dirname, '../../data/company/images', filename); // Adjust path to image directory

  // Check if the file exists
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('Image not found:', err);
      return res.status(404).json({ error: 'Image not found' });
    }

    // Serve the image
    res.sendFile(imagePath);
  });
};