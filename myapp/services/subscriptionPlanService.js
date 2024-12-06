const SubscriptionPlan = require('../models/subscriptionPlan');

// Service: Get all subscription plans
exports.getAllPlans = async () => {
  return await SubscriptionPlan.find();
};

// Service: Get a specific subscription plan by ID
exports.getPlanById = async (id) => {
  const plan = await SubscriptionPlan.findById(id);

  if (!plan) {
    const error = new Error('Subscription plan not found');
    error.statusCode = 404;
    throw error;
  }

  return plan;
};

// Service: Create a new subscription plan
exports.createPlan = async ({ planName, price, duration, features }) => {
  if (!planName || !price || !duration || !Array.isArray(features)) {
    const error = new Error('All fields (planName, price, duration, features) are required');
    error.statusCode = 400;
    throw error;
  }
  return await new SubscriptionPlan({ planName, price, duration, features }).save();
};

// Service: Update a subscription plan
exports.updatePlan = async (id, data) => {
  const plan = await SubscriptionPlan.findByIdAndUpdate(id, data, { new: true });
  if (!plan) {
    const error = new Error('Subscription plan not found');
    error.statusCode = 404;
    throw error;
  }
  return plan;
};

// Service: Delete a subscription plan
exports.deletePlan = async (id) => {
  const plan = await SubscriptionPlan.findByIdAndDelete(id);
  if (!plan) {
    const error = new Error('Subscription plan not found');
    error.statusCode = 404;
    throw error;
  }
};
