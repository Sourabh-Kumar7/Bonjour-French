const express = require('express')

const { deleteUser } = require('../controllers/userController')
const { updateUserDetails, getAllUsers } = require('../controllers/userController')
const router = express.Router()
const {registerUser} = require('../controllers/userController')
const { uploadImage } = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware')
const { getUserId } = require('../controllers/userController');


router.post('/create', registerUser)
router.put('/edit/:id', protect, updateUserDetails)
router.get('/getAll', getAllUsers)
router.delete('/delete', deleteUser)
router.post('/uploadImage', protect, uploadImage);
router.get('/getId', getUserId);

module.exports = router