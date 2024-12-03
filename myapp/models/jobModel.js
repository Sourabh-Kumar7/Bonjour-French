const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
        companyName: { type: String, required: true },
        jobTitle: { type: String, required: true },
        description: { type: String, required: true },
        salary: { type: Number, required: true },
        jobLink: {
            type: String,
            required: true,
          },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Job', jobSchema);
