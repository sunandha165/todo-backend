import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();   

import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from "./routes/authRoutes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.get('/', (req, res) => res.send('Task API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//mongodb+srv://vajrapusunandhamani_db_user:XtEam0mBzQ8HrFFZ@cluster0.cx2uydl.mongodb.net/?appName=Cluster0