import express from "express";
import morgan from "morgan";

import authRouts from './routes/auth.routes.js'

const app = express();

app.use(morgan('dev'));
app.use(express.json())

app.use('/api', authRouts);

export default app;
