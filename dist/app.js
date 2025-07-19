"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_routes_1 = __importDefault(require("./routes/product-routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cors_1 = __importDefault(require("cors"));
const auth_middleware_1 = require("./middleware/auth.middleware");
// 1. Initialize the express app
const app = (0, express_1.default)();
// 2. Define Middlewares
// 2.1 Instruct to parse the request payload data to be converted to JSON format
app.use(express_1.default.json());
// app.use(cors()); // Enable/Allow CORS here
const allowedOrigins = [
    "http://localhost:5173"
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};
app.use((0, cors_1.default)(corsOptions)); // Enable/Allow CORS according to defined options
app.use("/api/auth", auth_routes_1.default);
app.use("/api/products", auth_middleware_1.authenticateToken, product_routes_1.default);
// Expert the app to use outside (in index.ts)
exports.default = app;
