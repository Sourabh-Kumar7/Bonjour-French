const userSubscriptionService = require('../services/userSubscriptionService');

// Controller: Get all user subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await userSubscriptionService.getAllSubscriptions();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Controller: Get a specific subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await userSubscriptionService.getSubscriptionById(id);
    res.status(200).json(subscription);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};


// Controller: Add a subscription for a user
exports.addSubscription = async (req, res) => {
  try {
    const { userId, planId, startDate } = req.body;
    const subscription = await userSubscriptionService.addSubscription({
      userId,
      planId,
      startDate,
    });
    res.status(201).json(subscription);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    // Validate input
    if (typeof isActive === 'undefined') {
      return res.status(400).json({ error: '"isActive" field is required in the request body' });
    }

    // Call service to update the subscription
    const updatedSubscription = await userSubscriptionService.updateSubscription(id, { isActive });
    res.status(200).json(updatedSubscription);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
