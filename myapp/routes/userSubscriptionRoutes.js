const express = require('express');
const userSubscriptionController = require('../controllers/userSubscriptionController');

const router = express.Router();

router.get('/', userSubscriptionController.getAllSubscriptions);
router.get('/:id', userSubscriptionController.getSubscriptionById);
router.post('/', userSubscriptionController.addSubscription);
router.patch('/:id', userSubscriptionController.updateSubscription);

module.exports = router;
