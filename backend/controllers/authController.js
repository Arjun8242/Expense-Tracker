const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
}

exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({message: "Please provide all required fields"});
    }

    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const user = new User({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                token: generateToken(user._id),
            },
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({message: "Server error"});
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Please provide all required fields"});
    }
    try {
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "Invalid email or password"});
        }
        res.status(200).json({
            message: "Login successful",
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({message: "Server error"});
        
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
        
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({message: "Server error"});
        
    }
}