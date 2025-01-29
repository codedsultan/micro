import cloudinary from "cloudinary";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { runApp, closeApp } from "./app.js";
import initModules from "./initModules.js";
import logger from "./logger/index.js";

const app = runApp();
const Logger = logger.getInstance();
// Starting Server
(async () => {
  // Config
  if (process.env.NODE_ENV !== "production") {
      dotenv.config()
    // dotenv.config({
    //   path: "src/config/config.env",
    // });
  }

  // Cloudinary Setup
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const port = process.env.PORT || 4000;

  // Connecting to DB
  const connectToDatabase = async function () {

    Logger.info("App :: Connecting to MongoDB...");
    return mongoose.connect(
      process.env.MONGO_URI,
      {
        dbName: process.env.DB_NAME,
        autoIndex: true,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 60000,
        useNewUrlParser: true,
      }
    )
      .then(() => {
        Logger.info("App :: Connected to MongoDB...");
        // console.log('[database]: connected successfully to MongoDB');
    
        // Init Modules
        initModules(app);
    
        // Error Handler
        closeApp(app);
    
        const server = app.listen(port, (err) => {
          if (err) {
            Logger.error(`[server] could not start http server on port: ${port}`);
            // console.log(`[server] could not start http server on port: ${port}`);
            return;
          }
          Logger.info(`[server] running on port: ${port}`);
          // console.log(`[server] running on port: ${port}`);
        });
    
        // Handling Uncaught Exception
        process.on("uncaughtException", (err) => {
          // console.log(`Error: ${err.message}`);
          // console.log(`[server] shutting down due to Uncaught Exception`);
          Logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
          server.close(() => {
            process.exit(1);
          });
        });
    
        // Unhandled Promise Rejection
        process.on("unhandledRejection", (reason, promise) => {
          // console.log(`Error: ${err.message}`);
          // Logger.error(`[server] shutting down due to Unhandled Promise Rejection`);
          Logger.error(`Unhandled Rejection at: ${promise}`, { reason });

          server.close(() => {
            process.exit(1);
          });
        });
      })
      .catch((err) => {
        Logger.error(`[database]: could not connect due to [${err.message}]`);
        // console.log(`[database]: could not connect due to [${err.message}]`);
        app.listen(port, (err) => {
          if (err) {
            Logger.error(`[server] could not start http server on port: ${port}`);
            // console.log(`[server] could not start http server on port: ${port}`);
            return;
          }
          Logger.info(`[server] running on port: ${port}`);
          // console.log(`[server] running on port: ${port}`);
        });
    
        app.use("*", (req, res, next) => {
          res.status(500).json({
            success: false,
            message: "server is offline due to database error",
          });
        });
      });
  };

  connectToDatabase();


  //sockets
// const socketio=require('socket.io')


})();