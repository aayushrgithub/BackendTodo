import User from "../model/user.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        res.status(404).json({
            success: false,
            message: "Login First"
        });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id)
    next();
}