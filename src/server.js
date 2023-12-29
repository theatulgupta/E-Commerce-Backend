import { app } from './app.js';
import connectDB from "./db/database.js";
import dotenv from 'dotenv';
import { server } from './config.js';

// Load environment variables from the specified file
dotenv.config({ path: './.env' });

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Start the Express server on the specified port or default to 8000
    const port = server.port;
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });

    // Handle errors in the application
    app.on("error", (err) => {
      console.log("Express Server Error: ", err);
    });
  })
  .catch((error) => {
    console.error("MONGODB connection failed:", error);
    process.exit(1); // Exit the application on database connection failure
  });
