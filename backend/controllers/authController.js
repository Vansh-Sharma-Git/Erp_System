const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;  // Destructure name, email, and password from the request body
    console.log(req.body);  // Log request body for debugging

    try {
        // Check if user already exists
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });  // Return error if user already exists
        }

        // Create new user instance
        user = new User({ name, email, password });
        console.log(user);  // Log user object for debugging

        // Generate salt for hashing the password
        const salt = await bcrypt.genSalt(10);
        // Hash the password
        user.password = await bcrypt.hash(password, salt);

        // Save the new user to the database
        await user.save();

        // Create JWT payload
        const payload = { user: { id: user.id } };

        // Sign and return JWT token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });  // Respond with the token
        });
    } catch (err) {
        console.error(err.message);  // Log error message
        res.status(500).send('Server error');  // Respond with server error
    }
};
