import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 8000;

//db connect
import { connectDB } from "./src/config/dbConfig.js";

connectDB();

// middlewares
app.use(cors());
app.use(express.json());

//server side rendering

app.use("/", (req, res, next) => {
  try {
    res.send("<h1> Coming Soon.....</h1>");
  } catch (error) {
    next;
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
