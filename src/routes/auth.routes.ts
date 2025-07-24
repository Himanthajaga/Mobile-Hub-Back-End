import {Router} from "express";
import {authenticateUser,registerUser,updateUser} from "../controller/auth.controller";

const authRouter: Router = Router();

authRouter.post("/login",authenticateUser);
authRouter.post("/register", registerUser); // Assuming registerUser is also handled here
authRouter.put("/update/:id", updateUser); // Assuming updateUser is also handled here
export default authRouter;