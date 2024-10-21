const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');
const cartRoute = require('./routes/cartRoute');
const authMiddleware = require('./controllers/authMiddleware');
const testMiddleware = require('./controllers/testMiddleware');

const app = express();
connectDB();

app.use(cors());

// app.use(bodyParser.json());
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/product', authMiddleware, testMiddleware, productRoute);
app.use('/api/category', categoryRoute);
app.use('/api/cart', authMiddleware, cartRoute);

app.listen(5000, '127.0.0.1', () => {
    console.log("Server listening on port 5000");
})