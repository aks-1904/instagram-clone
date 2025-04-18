import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';
import messageRoute from './routes/message.route.js';
import { app, server } from "./socketio/socketio.js";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended: true}));
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};
app.use(cors(corsOptions));
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/message", messageRoute);

app.get("/", (req, res)=>{
    return res.status(200).json({
        message: "Hello World",
        success: true,
    });
});

server.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server listening to http://localhost:${PORT}`);
});