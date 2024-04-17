import express from "express"
import { getMyProfile, loginUser, logout, registerUser } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/register", (req, res) => {
    res.send("Register First")
})

router.get("/login", (req, res) => {
    res.send("Login First");
})

router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", logout);

router.post("/register", registerUser);
router.post("/login", loginUser)

export default router;