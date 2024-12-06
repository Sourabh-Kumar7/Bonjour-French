const mongoose = require('mongoose');

const subscriptionPlan = mongoose.Schema(
  {
    planName: {
      type: String,
      required: [true, 'Please add a plan name'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price for the subscription'],
    },
    duration: {
      type: Number,
      required: [true, 'Please add the duration of the subscription in months'],
    },
    features: {
      type: [String], 
      required: [true, 'Please specify the features included in the plan'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlan);
