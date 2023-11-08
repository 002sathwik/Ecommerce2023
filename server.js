import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/prodctRoute.js";
import emailRoute from "./routes/emailRoute.js"
import cors from "cors";

// Load environment variables from a .env file
dotenv.config();

// Configure the Express app
const app = express();

morgan.token("mongoStatus", (req, res) => {
  // Check the status of the MongoDB connection
  return res.locals.mongoStatus || "MongoDB Connection Status Unknown";
});

// Create a custom log function for MongoDB connection
const customMongoLogger = morgan(":mongoStatus");

// Database Config
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(customMongoLogger);

//Router api
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/email", emailRoute);

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Epark</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(colors.bgCyan.white(`Server running on port ${PORT}`));
});
