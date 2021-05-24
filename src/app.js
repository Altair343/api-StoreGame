import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import helmet from "helmet";

import productRoutes from "./routes/products.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { createRoles } from "./libs/initialSetup";

//inicializando
const app = express();
import('./database');
createRoles();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
var whitelist = ['http://localhost:3000', 'https://www.example.com']

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

//app.use(cors(corsOptions));
app.use(cors());

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => res.redirect('/api'));
app.get('/api', (req, res) => res.status(200).json({
    data:{
        Message: "Hola"
    }
}));

app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);


export default app;