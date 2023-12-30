import cartRouter from './routes/cart.routes.js';
import categoryRouter from './routes/category.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import express from "express";
import helmet from 'helmet';
import morgan from "morgan";
import orderRouter from './routes/order.routes.js';
import productRouter from './routes/product.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) with specified origin and credentials
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Major Configurations -> Production Level Code

// Parse incoming JSON requests with a size limit of 16kb
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded data with extended support and a size limit of 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse cookies using cookie-parser middleware
app.use(cookieParser());

app.use(helmet());
app.use(morgan('dev'));

// Routes declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

export { app };
