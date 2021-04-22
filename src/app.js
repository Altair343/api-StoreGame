require('dotenv').config();

import express from 'express';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';

import productRoutes from "./routes/products.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { createRoles } from "./libs/initialSetup";

const app = express();
import ('./database');
createRoles();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('imgFile'));






// Routes
app.get('/api', (req, res) => res.send('Hello World!'));

app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

export default app;