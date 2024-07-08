import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error-middleware.js";
import connectDb from "./utils/db.js";
import authRoutes from "./routes/auth-routes.js";
import movieRoutes from "./routes/movie-routes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;
connectDb();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use("/api/movie", movieRoutes);

//* Middleware
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
