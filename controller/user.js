import User from "../model/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        res.status(404).json({
            success: false,
            message: "User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    user = await User.create({
        name, email, password: hashedPassword
    })
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(201).cookie("token", token, {
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message: "User created successfully"
    })
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not registered"
        })
    }
    const isMatch = await bcrypt.compare(password, user?.password)
    if (!isMatch) res.status(404).json({
        success: false,
        message: "Invalid Email or Password"
    })
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(201).cookie("token", token, {
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message: "Login Successfull"
    })

}

export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    })
}

export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        user: req.user,
    })
}