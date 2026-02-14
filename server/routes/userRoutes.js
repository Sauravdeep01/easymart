const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const cleanEmail = email.trim().toLowerCase();

    console.log(`Login attempt for: [${cleanEmail}] (len: ${cleanEmail.length})`);
    console.log(`Password length: ${password.length}`);
    if (password.length > 0) {
        console.log(`Password starts with: '${password[0]}', ends with: '${password[password.length - 1]}'`);
    }

    try {
        const user = await User.findOne({ email: cleanEmail });

        if (user) {
            console.log(`User found in DB: [${user.email}]`);
            const isMatch = await user.comparePassword(password);
            console.log(`Password match result: ${isMatch}`);

            if (isMatch) {
                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id),
                });
            }
        }

        console.log('Authentication failed');
        res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Register new user
// @route   POST /api/users
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({ name, email, password });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
            user.gender = req.body.gender !== undefined ? req.body.gender : user.gender;
            user.birthday = req.body.birthday !== undefined ? req.body.birthday : user.birthday;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                phone: updatedUser.phone,
                gender: updatedUser.gender,
                birthday: updatedUser.birthday,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
