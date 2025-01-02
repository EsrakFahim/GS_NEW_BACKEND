import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url"; // For resolving paths
import { connectDB } from "./db/index.js";
// import next from "next";

// Load environment variables
dotenv.config({ path: "./.env" }); // Ensure `.env` is in the root directory

// Setup path resolution for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5050;

// Initialize Next.js app
// const dev = process.env.NODE_ENV !== "production";
// const nextApp = next({ dev, dir: path.join(__dirname, "../../frontend") }); // Ensure the correct path for frontend
// const nextHandler = nextApp.getRequestHandler();

const allowedOrigins = [
      "http://localhost:3000", // Frontend 
      "https://gs-new-frontend.onrender.com", // Render frontend
      "https://galaxyspark.agency", // Production frontend
];

const corsOptions = {
      origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                  callback(null, true);
            } else {
                  console.error(`Blocked by CORS: Origin=${origin}`); // Debugging CORS
                  callback(new Error("Not allowed by CORS"));
            }
      },
      credentials: true,
      optionsSuccessStatus: 200,
};

// Middleware setup
app.use(cors(corsOptions));
app.use(morgan("dev")); // Log HTTP requests
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      message: {
            message: "Too many requests from this IP, please try again after 15 minutes",
      },
});
app.use(limiter);

// API Routes import
import clientRouter from "./routes/client.routes.js";
import contactRoute from "./routes/contact.routes.js";
import serviceRoute from "./routes/service.routes.js";
import projectsRoute from "./routes/projects.routes.js";
import teamMemberRoute from "./routes/teamMember.routes.js";
import pricePlanRoute from "./routes/pricePlan.routes.js";
import agencyStatsRoute from "./routes/agencyStats.routes.js";
import homePageRoute from "./routes/homeItems.routes.js";
import aboutPageRoute from "./routes/aboutItems.routes.js";

// API Routes setup
app.use("/api/v1/client", clientRouter);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/projects", projectsRoute);
app.use("/api/v1/team-member", teamMemberRoute);
app.use("/api/v1/price-plan", pricePlanRoute);
app.use("/api/v1/agency-stats", agencyStatsRoute);
app.use("/api/v1/home-page", homePageRoute);
app.use("/api/v1/about-page", aboutPageRoute);

// Start the server
const startServer = async () => {
      try {
            // Connect to MongoDB
            console.log("Connecting to MongoDB...");
            await connectDB();
            console.log("MongoDB connected successfully.");

            // Prepare Next.js app
            // console.log("Preparing Next.js...");
            // await nextApp.prepare();
            // console.log("Next.js prepared successfully.");

            // Serve static files if necessary (adjust path if needed)
            // app.use('/static', express.static(path.join(__dirname, "public"))); 

            // Handle all other routes with Next.js
            app.all("*", (req, res) => {
                  return nextHandler(req, res);
            });

            // Start the Express server
            app.listen(PORT, () => {
                  console.log(`Server is running on http://localhost:${PORT}`);
            });
      } catch (error) {
            console.error("Error during server startup:", error.message);
            process.exit(1); // Exit with a failure code
      }
};

// Global Error Handling Middleware
app.use((err, req, res, next) => {
      console.error("Error in request:", err.stack);
      res.status(500).json({ message: err.message || "Internal Server Error" });
});

// 404 Handler for API and other paths
app.use((req, res) => {
      console.error(`Route not found: ${req.originalUrl}`);
      res.status(404).json({ message: "Route Not Found" });
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
      console.log(`Received ${signal}. Closing server gracefully...`);
      try {
            // Optionally close MongoDB connection
            // await disconnectDB(); // Close MongoDB connection
            process.exit(0);
      } catch (error) {
            console.error("Error during shutdown:", error.message);
            process.exit(1);
      }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Start the server
startServer();
