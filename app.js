import express from "express"
import { config } from "dotenv";
import { connectDB } from "./utils/database.js";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

config({
    path: "./utils/config.env",
})

connectDB();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))


app.use("/user", userRoute)
app.use("/task", taskRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port:${process.env.PORT} in ${process.env.NODE_ENV}`);
})