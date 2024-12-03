const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
require('dotenv').config();

const multer = require('multer');
const path = require('path');

// Storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'data/user/images/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter for validating image formats (JPEG, PNG, GIF)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
  
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and GIF file formats are allowed'));
    }
};

// Initialize multer with the storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
}).single('image'); 


// @desc Upload Image
// @route POST /api/user/uploadImage
// access Private
const uploadImage = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        res.status(400);
        throw new Error(err.message);
      }
  
      if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
      }
  
      const user = await User.findById(req.user.id);
  
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }
  
      user.image = req.file.path; 
      await user.save();
  
      res.status(200).json({
        message: 'Image uploaded successfully',
        imagePath: req.file.path,
      });
    });
  });

// @desc Create a user
// @route Post /api/user/create
// access Public
const registerUser = asyncHandler( async (req,res) =>{

    const { name, email, password, type } = req.body;

    // Validate name
    if (!name || typeof name !== "string" || name.trim().length === 0 || !name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
        res.status(400);
        throw new Error('Please enter a valid full name (First Last)');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email) && email.endsWith('@northeastern.edu');
    if (!validEmail) {
        res.status(400);
        throw new Error('Please enter a valid Northeastern University email address');
    }

    // Validate password
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const validPassword = passwordRegex.test(password);
    if (!validPassword) {
        res.status(400);
        throw new Error('Please enter a valid password (minimum eight characters, at least one uppercase letter, one lowercase letter, and one number)');
    }

    // Validate type
    const validTypes = ["employee", "admin"];
    if (!type || !validTypes.includes(type)) {
        res.status(400);
        throw new Error('Please specify a valid type: "employee" or "admin"');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        type,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid User data');
    }
});


// @desc Get all users
// @route GET /api/user/getAll
// access Public
const getAllUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find({}, '-password'); 
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })

// @desc Update user details
// @route PUT /api/user/edit/:id
// @access Private
const updateUserDetails = asyncHandler(async (req, res) => {
  const { name, password, type } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
      res.status(404);
      throw new Error("User not found");
  }

  if (req.body.email) {
      res.status(400);
      throw new Error("You can't update your email");
  }

  if (name) {
      if (!name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
          res.status(400);
          throw new Error('Please enter a valid full name');
      }
  }

  let hashedPassword;
  if (password) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      const validPassword = passwordRegex.test(password);
      if (!validPassword) {
          res.status(400);
          throw new Error(
              'Please enter a valid password (minimum eight characters, at least one uppercase letter, one lowercase letter, and one number)'
          );
      }

      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
  }

  if (type) {
      const validTypes = ["employee", "admin"];
      if (!validTypes.includes(type)) {
          res.status(400);
          throw new Error('Invalid type. Allowed values are "employee" or "admin"');
      }
      user.type = type;
  }

  user.name = name || user.name;
  user.password = hashedPassword || user.password;

  const updatedUser = await user.save();

  res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      type: updatedUser.type,
  });
});



// @desc delete user data
// @route Delete /api/users/delete
// access Public
const deleteUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    const user = await User.findOneAndDelete({ email });
    
    if (!user) {
    res.status(404);
    throw new Error('User not found');
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
    });


const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


module.exports = {
    registerUser,
    updateUserDetails,
    getAllUsers,
    deleteUser,
    uploadImage
}