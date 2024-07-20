const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Function to calculate the age of the user
const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return age;
};

// API for signup
exports.signup = async (req, res) => {
    try {
        const { phoneNumber, email, name, dob, monthlySalary, password } = req.body;
        const age = calculateAge(dob);

        // Age validation
        if (age < 20) {
            return res.json({ success:false, message: 'User should be above 20 years of age.' });
        }
        // Salary validation
        if (monthlySalary < 25000) {
            return res.json({success:false, message: 'Monthly salary should be 25k or more.' });
        }

        // Create user
        const user = new User({
            phoneNumber,
            email,
            name,
            dob,
            monthlySalary,
            password,
            status: 'approved', // if the user is verified then status will be approved
        });

        await user.save();

        // After successful registration, generate a JWT token to be used while login
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success:true, message: 'User registered successfully'});
    } catch (error) {
        console.error(error);
        res.json({ success:false, message: 'Server error' });
    }
};

// API for login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({success:false, message: 'Invalid Email id' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success:false, message: 'Invalid password' });
        }

        const payload = { user: { id: user.id } };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.json({ success:false, message: 'Server error' });
    }
};

// API for getting user data
exports.getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.json({ success:false, message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.json({ success:false, message: 'Server error' });
    }
};

// API for borrowing money
exports.borrowMoney = async (req, res) => {
    try {
        const { amount } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.json({ success:false, message: 'User not found' });
        }

        user.purchasePower += amount;
        const annualInterestRate = 0.08;
        const monthlyInterestRate = annualInterestRate / 12;
        const tenure = 12; 
        const monthlyRepayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -tenure));

        await user.save();

        res.status(200).json({
            purchasePower: user.purchasePower,
            monthlyRepayment: monthlyRepayment.toFixed(2) 
        });
    } catch (error) {
        console.error(error);
        res.json({ success:false, message: 'Server error' });
    }
};
