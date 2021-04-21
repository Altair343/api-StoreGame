import express from 'express';
import morgan from 'morgan';

import productRoutes from "./routes/products.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";


const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));







// Routes
app.get('/api', (req, res) => res.send('Hello World!'));

app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

export default app;