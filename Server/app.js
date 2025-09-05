import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

import userRoute from './routes/user.route.js';
import companyRoute from './routes/companyroute.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/applicationroutes.js';

dotenv.config({});

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173", 
      "https://kaammila2-eat9.vercel.app" 
    ];

    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ Default route for testing
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// Connect to MongoDB and start server
connectDB().then(() => {
    console.log('MongoDB connected');

    const PORT = process.env.PORT || 3000;

    // API Routes
    app.use('/api/v1/user', userRoute);
    app.use('/api/v1/company', companyRoute);
    app.use('/api/v1/job', jobRoute);
    app.use('/api/v1/application', applicationRoute);
   
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
}).catch(err => {
    console.error('DB connection failed:', err);
});
