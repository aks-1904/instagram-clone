import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended: true}));
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res)=>{
    return res.status(200).json({
        message: "Hello World",
        success: true,
    });
});

app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server listening to http://localhost:${PORT}`);
});