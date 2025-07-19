"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const DBConnection_1 = __importDefault(require("./db/DBConnection"));
dotenv_1.default.config(); // Load environment variables from .env file
//Define the application port
const port = process.env.PORT || 3000;
(0, DBConnection_1.default)().then(result => console.log(result));
//Instructs the express app to listen on port 3000
app_1.default.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
