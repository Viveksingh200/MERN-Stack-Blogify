import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);


app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

(async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
})();
