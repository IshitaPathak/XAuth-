import express from "express";
import twitterOAuth from "../twitterOAuth.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", twitterOAuth);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Twitter OAuth Backend is running" });
});

export default app; 