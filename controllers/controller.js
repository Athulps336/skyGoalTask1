require('../models/userShema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const User = require('../models/userShema');
const jwtSecretKey = "thisIsTheSecretKey";

// Register new user
const Register = async (req, res) => {
    const { email, firstName, lastName, password, age, profession } = req.body;

    try {
        if (!email || !firstName || !lastName || !password || !age || !profession) {
            return res.status(403).json({ message: "All inputs are required" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json("User already exists. Please login to continue !!");
        } else {
            const hash = await bcrypt.hash(password, 10);
            const newUser = await User.create({ email, firstName, lastName, password: hash, age, profession });
            return res.status(201).json({ message: "User registered successfully", data: newUser });
        }
    } catch (err) {
        return res.status(500).json({ error: err }); 
    }
}

// Login
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const data = await bcrypt.compare(password, user.password);
            if (data) {
                const maxAge = 10 * 60 * 60;
                const token = jwt.sign({ email: user.email }, jwtSecretKey, { expiresIn: maxAge });
                return res.status(200).json({ token: token, user: user }); 
            } else {
                return res.status(401).json("Incorrect Password");
            }
        } else {
            return res.status(404).json("User not found. Please register first.");
        }
    } catch (err) {
        return res.status(500).json({ error: err }); 
    }
}

module.exports = { Register, Login };
