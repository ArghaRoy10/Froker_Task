const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');


dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Route
app.use('/api', require('./routes/userRoutes'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
