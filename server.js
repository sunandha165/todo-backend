import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from "./routes/authRoutes.js";

connectDB();

const app = express();

// ⭐ IMPORTANT: Correct CORS for Vercel + Localhost
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://todo-frontend-z5h5-bmu72om10-sunandha165s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.get('/', (req, res) => res.send('Task API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
