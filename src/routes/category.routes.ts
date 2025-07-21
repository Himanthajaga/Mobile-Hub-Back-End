import { Router } from "express";
import { saveCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controller/category.controller";
import { authorizeRoles } from "../middleware/auth.middleware";
import multer from "multer";

const categoryRouter: Router = Router();
const storage = multer.diskStorage({});
const upload = multer({ storage });
categoryRouter.get("/all", getAllCategories);
categoryRouter.post("/save", authorizeRoles("admin"), upload.single("image"), saveCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/update/:id", authorizeRoles("admin"), upload.single("image"), updateCategory);
categoryRouter.delete("/delete/:id", authorizeRoles("admin"), deleteCategory);

export default categoryRouter;