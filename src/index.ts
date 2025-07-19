import app from "./app";
import dotenv from 'dotenv';
import DBConnection from "./db/DBConnection";
dotenv.config(); // Load environment variables from .env file

//Define the application port
const port = process.env.PORT|| 3000;

DBConnection().then(result => console.log(result));


//Instructs the express app to listen on port 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});