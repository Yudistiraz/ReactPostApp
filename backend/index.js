import express from 'express';
import db from './config/Database.js';
import UserRoute from "./routes/UserRoute.js"
import PostRoute from './routes/PostRoute.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

dotenv.config();


const app = express(); 
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials : true, origin : 'http://localhost:3000'}));
app.use(fileUpload());
app.use(express.static("public"));

try {
    await db.authenticate();
    console.log('authenticated');
} catch (error) {
    console.log(error);
}

app.use(UserRoute);
app.use(PostRoute); 

app.listen(5000, () => {
    console.log('listening on port http://localhost:5000')
})