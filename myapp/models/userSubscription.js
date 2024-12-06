const mongoose = require('mongoose');

const userSubscription = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: [true, 'User reference is required'],
    },
    subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubscriptionPlan', // Reference to the SubscriptionPlan model
      required: [true, 'Subscription plan reference is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    isActive: {
      type: Boolean,
      default: true, // Helps to identify the currently active subscription
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserSubscription', userSubscription);
