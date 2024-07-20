const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const url = process.env.MONGO_URI;
        if (!url) {
            throw new Error('MONGO_URL is not defined');
        }
        await mongoose.connect(url);
        console.log('DB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
module.exports = connectDB;
