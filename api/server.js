import express from "express";
import "dotenv/config.js";
import cors from "cors";
import morgan from "morgan"; // Move morgan import to the top
import path from "path";

const app = express();
const PORT = 8000;

// db connect
import { connectDB } from "./src/config/dbConfig.js";
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Now morgan is imported before its usage

// APIs
import userRouter from "./src/routers/userRouter.js";
import contentRouter from "./src/routers/contentRouter.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")));

// Server-side rendering
app.use("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  const status = error.status || 404;

  res.status(status).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`Your server is serving at http://localhost:${PORT}`);
});
