import express, {Express} from "express";
import productRoutes from "./routes/product-routes";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import {authenticateToken} from "./middleware/auth.middleware";
import categoryRoutes from "./routes/category.routes";
import path from "path";
import cloudinaryRoutes from "./routes/cloudinary.routes";
import paymentRoutes from "./routes/payment.routes";
import helmet from "helmet";
import contactRoutes from "./routes/contact.routes";
// 1. Initialize the express app
const app: Express = express();
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://www.payhere.lk", "'unsafe-inline'"],
                connectSrc: ["'self'", "https://www.payhere.lk"],
                frameSrc: ["'self'", "https://www.payhere.lk"],
            },
        },
    })
);
// 2. Define Middlewares

// 2.1 Instruct to parse the request payload data to be converted to JSON format
// app.use(express.json());
// app.use(cors()); // Enable/Allow CORS here
const allowedOrigins = [
    "http://localhost:5173"
];
// Increase the payload size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));
const corsOptions = {
    origin: (origin: string | undefined,
             callback: (err: Error | null,
                        allow?:boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};
app.use(cors(corsOptions)); // Enable/Allow CORS according to defined options
// Serve static files from the uploads folder
// app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes); // Contact route
app.use("/api/users/", authenticateToken, authRoutes); // Toggle user active status route
app.use("/api/auth/all", authenticateToken, authRoutes); // Get all users route
app.use("/api/auth/register", authRoutes); // Register route
app.use("/api/auth/update", authenticateToken, authRoutes); // Update user route
app.use("/api/products", authenticateToken, productRoutes);
app.use("/api/categories", authenticateToken,categoryRoutes); // Assuming categories are managed in the same routes
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/payments",authenticateToken,paymentRoutes);
app.use("/api/create-payment-intent",authenticateToken,paymentRoutes);
app.use("/api/auth/send-otp", authRoutes); // Send OTP route
app.use("/api/auth/reset-password-with-otp", authRoutes); // Reset password with OTP route
// Add the Cloudinary routes
app.use("/api/cloudinary", cloudinaryRoutes);
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));
// Expert the app to use outside (in index.ts)
export default app;