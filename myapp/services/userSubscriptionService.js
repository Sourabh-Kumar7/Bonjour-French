const UserSubscription = require('../models/userSubscription');
const SubscriptionPlan = require('../models/subscriptionPlan');
const User = require('../models/userModel');

// Service: Get all user subscriptions
exports.getAllSubscriptions = async () => {
  return await UserSubscription.find()
    .populate('user', 'name email')
    .populate('subscriptionPlan', 'planName price duration');
};

// Service: Get a specific user subscription by ID
exports.getSubscriptionById = async (id) => {
  const subscription = await UserSubscription.findById(id)
    .populate('user', 'name email')
    .populate('subscriptionPlan', 'planName price duration');
  
  if (!subscription) {
    const error = new Error('Subscription not found');
    error.statusCode = 404;
    throw error;
  }
  return subscription;
};


// Service: Add a subscription for a user
exports.addSubscription = async ({ userId, planId, startDate }) => {
  if (!userId || !planId || !startDate) {
    const error = new Error('All fields (userId, planId, startDate) are required');
    error.statusCode = 400;
    throw error;
  }

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  // Check if the plan exists
  const plan = await SubscriptionPlan.findById(planId);
  if (!plan) {
    const error = new Error('Subscription Plan not found');
    error.statusCode = 404;
    throw error;
  }

  // Calculate end date based on plan duration
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(startDateObj);
  endDateObj.setMonth(endDateObj.getMonth() + plan.duration);

  // Save the subscription
  const subscription = new UserSubscription({
    user: userId,
    subscriptionPlan: planId,
    startDate: startDateObj,
    endDate: endDateObj,
    isActive: true,
  });

  return await subscription.save();
};

// Service: Update a user's subscription (only `isActive` field)
exports.updateSubscription = async (id, updateData) => {
  // Ensure `isActive` is the only field allowed for update
  if (Object.keys(updateData).length > 1 || !('isActive' in updateData)) {
    const error = new Error('Only the "isActive" field can be updated');
    error.statusCode = 400;
    throw error;
  }

  // Find the subscription by ID
  const subscription = await UserSubscription.findById(id);
  if (!subscription) {
    const error = new Error('Subscription not found');
    error.statusCode = 404;
    throw error;
  }

  // Update only the `isActive` field
  subscription.isActive = updateData.isActive;

  // Save the updated subscription and return the result
  return await subscription.save();
};

