import express from 'express';
//third party middleware
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors'; 
import mongoose from "mongoose";

//Routers
import {healthRouter} from './routes/health.js';
import userRouter from "./routes/users.js";

dotenv.config();
// console.log(process.env.MONGODB_URI)

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((e) => console.error(e));

const PORT = process.env.PORT || 4000;
const app = express();


//View Engine
app.set('views',"./views");
app.set("view engine", "pug");


//Middlewares -- all middlewares in same place
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());


app.get('/', (req, res) => {
    res.render("index");
})

//API Routes
app.use('/api/health', healthRouter);
app.use("/api/users", userRouter);

//TODO: Global Error Handler
app.use((err, _req, res, next) => {
    console.error(err);
    res.status(500).send("Seems like we messed up somewhere...");
  });



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

