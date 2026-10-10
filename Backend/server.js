
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const PORT = process.env.PORT || 8080;

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Auth routes
app.use("/api/auth", authRoutes);

// Connect database and start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();



































// import dotenv from "dotenv";
// dotenv.config();

// import app from "./app.js";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import cors from "cors";

// const PORT = process.env.PORT || 8080;

// // Auth routes
// app.use("/api/auth", authRoutes);

// // Connect database and start server
// const startServer = async () => {
//   try {
//     await connectDB();

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Server startup failed:", error.message);
//     process.exit(1);
//   }
// };

// startServer();


























// require("dotenv").config();

// const app = require("./app");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes")

// const PORT = process.env.PORT || 8080;

// connectDB();

// app.use("/api/auth",authRoutes)

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });