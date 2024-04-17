import express from "express"
import { deleteTask, getMyTask, newTask, updateTask } from "../controller/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.get("/my", isAuthenticated, getMyTask);
router.post("/new", isAuthenticated, newTask);
router.route("/:id").put(updateTask).delete(deleteTask);


export default router;