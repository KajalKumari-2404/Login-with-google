import express from "express";
import cors from "cors";

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON Middleware
app.use(express.json());

export default app;

























// const express = require("express");
// // const cors = require("cors");

// const app = express();

// // app.use(cors());
// app.use(express.json());

// module.exports = app;