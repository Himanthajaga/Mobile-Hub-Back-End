import {Router} from "express";
import {authenticateUser, registerUser, updateUser, getAllUsers, toggleUserStatus} from "../controller/auth.controller";

const authRouter: Router = Router();

authRouter.post("/login",authenticateUser);
authRouter.post("/register", registerUser); // Assuming registerUser is also handled here
authRouter.put("/update/:id", updateUser); // Assuming updateUser is also handled here
authRouter.get("/all", getAllUsers); // Assuming this is for getting all users, adjust as needed
authRouter.post('/:id/toggle-active', (req, res, next) => {
    console.log("Route hit for toggling user status");
    next();
}, toggleUserStatus);
export default authRouter;