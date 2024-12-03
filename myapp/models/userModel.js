const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please add a name']
        },
        email: {
            type: String,
            required: [true, 'please add a email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'please add a password']
        },
        type: { 
            type: String, 
            enum: ['employee', 'admin'], 
            required: [true, 'please add a user type'] 
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)
