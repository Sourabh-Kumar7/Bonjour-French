const subscriptionPlanService = require('../services/subscriptionPlanService');

// Controller: Get all subscription plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await subscriptionPlanService.getAllPlans();
    res.status(200).json(plans);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Controller: Get a specific subscription plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await subscriptionPlanService.getPlanById(id);
    res.status(200).json(plan);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Controller: Create a new subscription plan
exports.createPlan = async (req, res) => {
  try {
    const { planName, price, duration, features } = req.body;
    const plan = await subscriptionPlanService.createPlan({
      planName,
      price,
      duration,
      features,
    });
    res.status(201).json(plan);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Controller: Update a subscription plan
exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPlan = await subscriptionPlanService.updatePlan(id, req.body);
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Controller: Delete a subscription plan
exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await subscriptionPlanService.deletePlan(id);
    res.status(200).json({ message: 'Subscription plan deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
