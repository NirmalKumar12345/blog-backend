import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.routes.js'
import Post from "./routes/post.routes.js"

const app = express();
// const allowedOrigins = ["http://localhost:3000",
//     "http://localhost:3001", "http://localhost:8000", process.env.FRONTEND_URL];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")
//         ) {
//             return callback(null, true);
//         }
//         else {
//             return callback(new Error("Not allowed by cors"));
//         }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/post', Post);
app.use('/uploads', express.static("uploads"))
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ msg: err.message || 'Server Error' });
});
export default app;