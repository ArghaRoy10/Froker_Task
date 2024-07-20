const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    dob: { type: Date, required: true },
    monthlySalary: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    password: { type: String, required: true },
    purchasePower: { type: Number, default: 0 },
});

// Middleware to hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log('Password hashed after successful registration');
        next();
    } catch (error) {
        console.error('Error hashing password:', error);
        next(error); 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
