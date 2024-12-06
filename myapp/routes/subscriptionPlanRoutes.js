const express = require('express');
const subscriptionPlanController = require('../controllers/subscriptionPlanController');

const router = express.Router();

router.get('/', subscriptionPlanController.getAllPlans);
router.get('/:id', subscriptionPlanController.getPlanById);
router.post('/', subscriptionPlanController.createPlan);
router.put('/:id', subscriptionPlanController.updatePlan);
router.delete('/:id', subscriptionPlanController.deletePlan);

module.exports = router;
