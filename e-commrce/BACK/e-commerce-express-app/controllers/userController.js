const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registration 
exports.register = async (req, res) => {
    console.log(req.body);

    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: 'User already exists!' });

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();

        return res.status(201).json({ message: 'User has been registered!' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Login
exports.login = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(400).json({ message: 'Invalid Credentials!' });

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid Credentials!' });

        // Create JWT 
        const token = jwt.sign({ id: existingUser._id }, 'secretKey', { expiresIn: '1h' });

        return res.json({ message: 'Login Successful', token });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
